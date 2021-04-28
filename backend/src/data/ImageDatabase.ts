import { NotFoundError } from "../error/NotFoundError";
import { Image } from "../model/Image";

import { BaseDatabase } from "./BaseDatabase";

export class ImageDatabase extends BaseDatabase {

    public async createImage(image: Image): Promise<void> {
        try {
            await this.getConnection()
            .insert({
                id: image.getId(),
                subtitle: image.getSubtitle(),
                author: image.getAuthor(),
                file: image.getFile()
            })
            .into(this.tables.images)
        } catch (err) {
            throw new Error(err.sqlMessage || err.message)
        }
    }

    public async getImageById(id: string): Promise<Image> {
        const image = await this.getConnection()
        .select("*")
        .from(this.tables.images)
        .where("id",id)

        if(!image[0]) {
            throw new NotFoundError(`Unable to found image with input: ${id}`)
        } 

        return Image.toImage(image[0])!
    }
}