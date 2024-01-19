import { BookModel } from "../models/Book.js";

export const addBookController = async (req, res) => {
  try {
    const { name, author, imageUrl, price } = req.body;
    console.log(name, author, imageUrl, price);
    const newBook = new BookModel({ name, author, imageUrl, price });
    await newBook.save();
    return res.json({ bookAdded: true });
  } catch (error) {
    return res.status(500);
  }
};

export const getBookController = async (req, res) => {
  try {
    const books = await BookModel.find();
    return res.json(books);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const editBookController = async (req, res) => {
  try {
    const id = req.params.id;
    const book = await BookModel.findById({ _id: id });
    return res.json({ book });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const updateBookController = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(req.body);
    const book = await BookModel.findByIdAndUpdate({ _id: id }, req.body);
    return res.status(201).json({ updated: true, book });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const deleteBookController = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(req.body);
    const book = await BookModel.findByIdAndDelete({ _id: id });
    return res.status(201).json({ deleted: true, book });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
