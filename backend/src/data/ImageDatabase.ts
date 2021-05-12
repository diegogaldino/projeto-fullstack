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
            for (let i = 0; i < tagsIds.length; i++) {
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

    public async getImageBySubtitle(subtitle: string): Promise<Image> {
        const image = await this.getConnection()
            .select("*")
            .from(this.tables.images)
            .where("subtitle", subtitle)

        if (!image[0]) {
            throw new NotFoundError(`Unable to found image with input: ${subtitle}`)
        }
        return Image.toImage(image[0])!
    }

    public async getImagesByAuthor(id: string): Promise<Image[]> {
        const image = await this.getConnection()
            .select("*")
            .from(this.tables.images)
            .where("author", id)

        if (!image[0]) {
            throw new NotFoundError(`Unable to found image with author input: ${id}`)
        }
        return image
    }
    public async getTagByImageId(id: string): Promise<Image[]> {

        const image = await this.getConnection()
            .raw(`select Project_tags.name from Project_images_tags
             join Project_tags on Project_tags.id=Project_images_tags.tag_id 
             where Project_images_tags.image_id="${id}";`)

        if (!image[0]) {
            throw new NotFoundError(`Unable to found image with tag input: ${id}`)
        }
        console.log("dsfs",image[0])
        return image[0]
    }
    public async getTagsByUserId(id: string): Promise<Image[]> {

        const image = await this.getConnection()
            .raw(`select * from Project_images_tags
            join Project_tags on Project_tags.id=Project_images_tags.tag_id
            join Project_images on Project_images.id=Project_images_tags.image_id
            where Project_images.author ="${id}";`)

        if (!image[0]) {
            throw new NotFoundError(`Unable to found image with tag input: ${id}`)
        }
        console.log("dsfs",image[0])
        return image[0]
    }
}