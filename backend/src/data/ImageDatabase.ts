import { NotFoundError } from "../error/NotFoundError";
import { Image } from "../model/Image";

import { BaseDatabase } from "./BaseDatabase";

export class ImageDatabase extends BaseDatabase {

    public async createImage(image: Image, tagsIds: string[], collectionId: string): Promise<void> {
        console.log(image, tagsIds, collectionId)
        try {
            await this.getConnection()
                .insert({
                    id: image.getId(),
                    subtitle: image.getSubtitle(),
                    author: image.getAuthor(),
                    file: image.getFile(),
                    collection: collectionId,
                })
                .into(this.tables.images)
        } catch (err) {
            throw new Error(err.sqlMessage || err.message)
        }
        try {
            for (let i = 0; i < tagsIds.length;i++){
                await this.getConnection()
                    .insert({
                        image_id: image.getId(),
                        tag_id: tagsIds[i]
                    })
                    .into(this.tables.imagesTags)
            }
        } catch (err) {
            throw new Error(err.sqlMessage || err.message)

        }
    }

    public async getImageById(id: string): Promise<Image> {
        const image = await this.getConnection()
            .select("*")
            .from(this.tables.images)
            .where("id", id)

        if (!image[0]) {
            throw new NotFoundError(`Unable to found image with input: ${id}`)
        }
        return Image.toImage(image[0])!
    }
    public async getAllImage(): Promise<Image[]> {
        const image = await this.getConnection()
            .select("*")
            .from(this.tables.images)
        if (!image[0]) {
            throw new NotFoundError(`Not found images`)
        }
        return image
    }
}