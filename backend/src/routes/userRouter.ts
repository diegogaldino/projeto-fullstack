import express from "express";
import { UserController } from "../controller/UserController";


export const userRouter = express.Router()

const userController = new UserController()

userRouter.get("/collection", userController.getUserCollection)
userRouter.get("/by-name", userController.getProfileByName)
userRouter.get("/:id", userController.getProfile)
userRouter.post("/signup", userController.signup)
userRouter.post("/login", userController.login)