import { BookModel } from "../models/Book.js";
import { User } from "../models/User.js";
import { creatorModel } from "../models/Creator.js";

export const getAllCount = async (req, res) => {
  try {
    const creatorCount = await creatorModel.countDocuments();
    const userCount = await User.countDocuments();
    const bookCount = await BookModel.countDocuments();
    return res.status(201).json({ creatorCount, userCount, bookCount });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
