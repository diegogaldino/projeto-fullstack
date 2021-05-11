
import { ImageDatabase } from "../data/ImageDatabase"
import { InvalidInputError } from "../error/InvalidInputError"
import { UnauthorizedError } from "../error/UnauthorizedError"
import { Image, ImageInputDTO } from "../model/Image"
import { Authenticator } from "../services/Authenticator"
import { IdGenerator } from "../services/IdGenerator"

export class ImageBusiness {
    constructor(
        private imageDatabase: ImageDatabase,
        private idGenerator: IdGenerator,
        private authenticator: Authenticator
    ) { }

    async registerImage(input: ImageInputDTO, token: string) {

        const tokenData = this.authenticator.getData(token)
        if (!tokenData.id) {
            throw new UnauthorizedError("Only authorized can access this feature")
        }
        if (!input.collection || !input.tag || !input.file || !input.subtitle) {
            throw new InvalidInputError("Invalid input to registerImage")
        }

        await this.imageDatabase.createImage(
            Image.toImage({
                id: this.idGenerator.generate(),
                author:tokenData.id,
                ...input,
            })!,
            input.tag,
            input.collection
        )
    }

    async getDetailImageById(id: string,token:string): Promise<Image> {
        const tokenData = this.authenticator.getData(token)
        if (!tokenData.id) {
            throw new UnauthorizedError("Only authorized can access this feature")
        }
        if (!id) {
            throw new InvalidInputError("Invalid id to getDetailImageById")
        }
        return this.imageDatabase.getImageById(id)
    }

    async getAllImage(token:string): Promise<Image[]> {
        const tokenData = this.authenticator.getData(token)
        if (!tokenData.id) {
            throw new UnauthorizedError("Only authorized can access this feature")
        }
        return this.imageDatabase.getAllImage()
    }

    async getImageBySubtitle(subtitle: string,token:string): Promise<Image> {
        const tokenData = this.authenticator.getData(token)
        if (!tokenData.id) {
            throw new UnauthorizedError("Only authorized can access this feature")
        }
        if (!subtitle) {
            throw new InvalidInputError("Invalid id to getImageBysubtitle")
        }
        return this.imageDatabase.getImageBySubtitle(subtitle)
    }
    async getImageByAuthorId(id: string,token:string): Promise<Image[]> {
        const tokenData = this.authenticator.getData(token)
        if (!tokenData.id) {
            throw new UnauthorizedError("Only authorized can access this feature")
        }
        if (!id) {
            throw new InvalidInputError("Invalid id to getImageByAuthorId")
        }
        return this.imageDatabase.getImagesByAuthor(id)
    }

    async getTagbyImageId(id: string,token:string): Promise<Image[]> {
        const tokenData = this.authenticator.getData(token)
        if (!tokenData.id) {
            throw new UnauthorizedError("Only authorized can access this feature")
        }
        if (!id) {
            throw new InvalidInputError("Invalid id to getTagbyImageId")
        }
        return this.imageDatabase.getTagByImageId(id)
    }
}