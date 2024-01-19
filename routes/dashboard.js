import express from "express";
import { getAllCount } from "../controllers/dashboardController.js";
import { verifyCreator } from "../middlewares/authMiddlewares.js";

const router = express.Router();

router.get("/dashboard", verifyCreator, getAllCount);

export { router as dashBoardRouter };
