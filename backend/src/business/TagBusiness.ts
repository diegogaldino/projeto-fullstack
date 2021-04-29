import { IdGenerator } from "../services/IdGenerator"
import { Authenticator } from "../services/Authenticator"
import { InvalidInputError } from "../error/InvalidInputError"
import { Tag, TagInputDTO } from "../model/Tag"
import { TagDatabase } from "../data/TagDatabase"
import { UnauthorizedError } from "../error/UnauthorizedError"

export class TagBusiness {
    constructor(
        private tagDatabase: TagDatabase,
        private idGenerator: IdGenerator,
        private authenticator: Authenticator
    ) { }

    async createTag(tag: TagInputDTO, token: string) {

        const tokenData = this.authenticator.getData(token)
        if (!tokenData.id) throw new UnauthorizedError("Only authorized can access this feature")

        if (!tag.name) throw new InvalidInputError("Invalid input to create tag") 

        const tagId = this.idGenerator.generate()
        await this.tagDatabase.createTag(
            Tag.toTagModel({ ...tag, id: tagId, })
        )

    }

    async getAllTags(token: string) {

        const tokenData = this.authenticator.getData(token)
        if (!tokenData.id) {
            throw new UnauthorizedError("Only authorized can access this feature")
        }

        return await this.tagDatabase.getAllTags()
    }
}