import express from "express";
import { verifyAll, verifyCreator } from "../middlewares/authMiddlewares.js";
import {
  addBookController,
  deleteBookController,
  editBookController,
  getBookController,
  updateBookController,
} from "../controllers/bookController.js";

const router = express.Router();

router.post("/add", verifyCreator, addBookController);
// router.post("/add", addBookController);

router.get("/getbooks", verifyAll, getBookController);
// router.get("/getbooks", getBookController);

router.get("/edit/:id", verifyCreator, editBookController);

router.put("/update/:id", verifyCreator, updateBookController);
router.delete("/delete/:id", verifyCreator, deleteBookController);

export { router as BookRouter };
