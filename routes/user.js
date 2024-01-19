import express from "express";
import { verifyCreator } from "../middlewares/authMiddlewares.js";
import { userRegisterController } from "../controllers/userController.js";

const router = express.Router();

router.post("/register", verifyCreator, userRegisterController);

export { router as UserRouter };
