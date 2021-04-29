import express from "express"
import { CollectionController } from "../controller/CollectionController"

export const collectionRouter = express.Router()

const collectionController = new CollectionController()

collectionRouter.get("/all", collectionController.allCollection)
collectionRouter.post("/create", collectionController.createCollection)
