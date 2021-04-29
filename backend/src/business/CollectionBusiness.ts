import { IdGenerator } from "../services/IdGenerator"
import { Authenticator } from "../services/Authenticator"
import { InvalidInputError } from "../error/InvalidInputError"
import { UnauthorizedError } from "../error/UnauthorizedError"
import { CollectionDatabase } from "../data/CollectionDatabase"
import { Collection, CollectionInputDTO } from "../model/Collection"

export class CollectionBusiness {
    constructor(
        private collectionDatabase: CollectionDatabase,
        private idGenerator: IdGenerator,
        private authenticator: Authenticator
    ) { }

    async createCollection(collection: CollectionInputDTO, token: string) {

        const tokenData = this.authenticator.getData(token)
        if (!tokenData.id) throw new UnauthorizedError("Only authorized can access this feature")

        if (!collection.name) throw new InvalidInputError("Invalid input to create collection") 

        const collectionId = this.idGenerator.generate()
        await this.collectionDatabase.createCollection(
            Collection.toCollectionModel({ ...collection, id: collectionId, })
        )
    }

    async getAllCollections(token: string) {

        const tokenData = this.authenticator.getData(token)
        if (!tokenData.id) {
            throw new UnauthorizedError("Only authorized can access this feature")
        }

        return await this.collectionDatabase.getAllCollections()
    }
}