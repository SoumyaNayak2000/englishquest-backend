import express from "express";
import {
  getRoleController,
  logOutController,
  loginController,
} from "../controllers/authController.js";
import { verifyAll } from "../middlewares/authMiddlewares.js";

const router = express.Router();

router.post("/login", loginController);

router.get("/verify", verifyAll, getRoleController);

router.get("/logout", logOutController);

export { router as creatorRouter };
