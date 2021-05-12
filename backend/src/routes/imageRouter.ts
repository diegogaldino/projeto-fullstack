import express from "express"
import { ImageController } from "../controller/ImageController"


export const imageRouter = express.Router()

const imageController = new ImageController()

imageRouter.get("/all", imageController.getAllImage)
imageRouter.get("/search-by-subtitle", imageController.getImageBySubtitle)
imageRouter.get("/tag/user/:id", imageController.getTagByUserId)
imageRouter.get("/author/:id", imageController.getImageByAuthorId)
imageRouter.get("/tag/:id", imageController.getTagByImageId)
imageRouter.get("/:id", imageController.getImageDetailById)
imageRouter.post("/register", imageController.registerImage)
