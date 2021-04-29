import express from "express"
import { TagController } from "../controller/TagController"


export const tagRouter = express.Router()

const tagController = new TagController()

tagRouter.get("/all", tagController.allTags)
tagRouter.post("/create", tagController.createTag)
