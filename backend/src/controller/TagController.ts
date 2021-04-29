import { Request, Response } from "express";
import { BaseDatabase } from "../data/BaseDatabase";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";
import { TagInputDTO } from "../model/Tag";
import { TagBusiness } from "../business/TagBusiness";
import { TagDatabase } from "../data/TagDatabase";

export class TagController {

    async createTag(req: Request, res: Response) {
        try {
            const input: TagInputDTO = {
                name: req.body.name
            }

            const tagBusiness = new TagBusiness(
                new TagDatabase,
                new IdGenerator,
                new Authenticator
            )

            await tagBusiness.createTag(input, req.headers.authorization as string);
            res.status(200).send({message: "Tag created successfully"});
        } catch (error) {
            res.status(400).send({ error: error.message });
        }
        await BaseDatabase.destroyConnection();
    }

    async allTags(req: Request, res: Response) {
        try {
            const tagBusiness = new TagBusiness(
                new TagDatabase,
                new IdGenerator,
                new Authenticator
            )
            const tags = await tagBusiness.getAllTags(req.headers.authorization as string)
            res.status(200).send({ tags })
        } catch (error) {
            res.status(400).send({ error: error.message });
        }
        await BaseDatabase.destroyConnection();
    }

}