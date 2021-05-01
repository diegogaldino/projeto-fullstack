import { Request, Response } from "express";
import { CollectionBusiness } from "../business/CollectionBusiness";
import { BaseDatabase } from "../data/BaseDatabase";
import { CollectionDatabase } from "../data/CollectionDatabase";
import { CollectionInputDTO } from "../model/Collection";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";


const collectionBusiness = new CollectionBusiness(
    new CollectionDatabase,
    new IdGenerator,
    new Authenticator
)

export class CollectionController {

    async createCollection(req: Request, res: Response) {
        try {
            const input: CollectionInputDTO = { name: req.body.name }
            await collectionBusiness.createCollection(input, req.headers.authorization as string);
            res.status(200).send({ message: "Collection created successfully" });
        } catch (error) {
            res.status(400).send({ error: error.message });
        }
        await BaseDatabase.destroyConnection();
    }

    async allCollection(req: Request, res: Response) {
        try {
            const collections = await collectionBusiness.getAllCollections(req.headers.authorization as string)
            res.status(200).send({ collections })
        } catch (error) {
            res.status(400).send({ error: error.message });
        }
        await BaseDatabase.destroyConnection();
    }

}