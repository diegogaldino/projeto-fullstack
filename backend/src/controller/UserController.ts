import { Request, Response } from "express";
import { UserInputDTO, LoginInputDTO} from "../model/User";
import { UserBusiness } from "../business/UserBusiness";
import { BaseDatabase } from "../data/BaseDatabase";
import { UserDatabase } from "../data/UserDatabase";
import { Authenticator } from "../services/Authenticator";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";

const userBusiness = new UserBusiness(
    new UserDatabase,
    new IdGenerator,
    new HashManager,
    new Authenticator
)

export class UserController {

    async signup(req: Request, res: Response) {
        try {
            const input: UserInputDTO = {
                email: req.body.email,
                name: req.body.name,
                password: req.body.password,
                nickname: req.body.nickname
            }

            const token = await userBusiness.createUser(input);
            res.status(200).send({ token });
        } catch (error) {
            res.status(400).send({ error: error.message });
        }
        await BaseDatabase.destroyConnection();
    }

    async login(req: Request, res: Response) {
        try {
            const loginData: LoginInputDTO = {
                email: req.body.email,
                password: req.body.password
            }
            const token = await userBusiness.authUserByEmail(loginData)
            res.status(200).send({ token })
        } catch (error) {
            res.status(400).send({ error: error.message });
        }

        await BaseDatabase.destroyConnection();
    }

    async getProfile(req: Request, res: Response) {
        try {  
            const userDB = await userBusiness.getProfileUserById(req.params.id as string,req.headers.authorization as string)
            res.status(200).send(userDB)
        } catch (error) {
            res.status(400).send({ error: error.message });
        }
        await BaseDatabase.destroyConnection();
    }

    async getProfileByName(req: Request, res: Response) {
        try {  
            const userDB = await userBusiness.getProfileUserByName(req.query.name as string,req.headers.authorization as string)
            res.status(200).send(userDB)
        } catch (error) {
            res.status(400).send({ error: error.message });
        }
        await BaseDatabase.destroyConnection();
    }

    async getUserCollection(req: Request, res: Response) {
        try {  
            const collections = await userBusiness.getUserCollectionsByAuthorId(req.headers.authorization as string)
            res.status(200).send(collections)
        } catch (error) {
            res.status(400).send({ error: error.message });
        }
        await BaseDatabase.destroyConnection();
    }

}