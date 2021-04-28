import express from "express"
import { ImageController } from "../controller/ImageController"


export const imageRouter = express.Router()

const imageController = new ImageController()

imageRouter.get("/:id", imageController.getImageDetailById)
imageRouter.put("/register", imageController.registerImage)