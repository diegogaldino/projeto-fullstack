import { Request, Response } from "express"
import { ImageBusiness } from "../business/ImageBusiness"
import { BaseDatabase } from "../data/BaseDatabase"
import { ImageDatabase } from "../data/ImageDatabase"
import { ImageInputDTO } from "../model/Image"
import { Authenticator } from "../services/Authenticator"
import { IdGenerator } from "../services/IdGenerator"

export class ImageController {
    async registerImage(req: Request, res: Response) {
        try {
            const input: ImageInputDTO = {
                subtitle: req.body.subtitle,
                file: req.body.file,
                tag:req.body.tagsIds,
                collection: req.body.collectionId
            }
    
            const imageBusiness = new ImageBusiness(
                new ImageDatabase,
                new IdGenerator,
                new Authenticator
            )
    
            await imageBusiness.registerImage(input, req.headers.authorization as string)
            res.sendStatus(200)
        } catch (err) {
            res.status(err.customErrorCode || 400).send({
                message: err.message
            })
        } finally {
            await BaseDatabase.destroyConnection()
        }
    }

    async getImageDetailById(req: Request, res: Response) {
        try {
            const id = (req.params.id) as string

            const imageBusiness = new ImageBusiness(
                new ImageDatabase,
                new IdGenerator,
                new Authenticator
            )
            const band = await imageBusiness.getDetailImageById(id)

            res.status(200).send(band)
        } catch (err) {
            res.status(err.customErrorCode || 400).send({
                message: err.message,
            })
        } finally {
            await BaseDatabase.destroyConnection()
        }
    }
}