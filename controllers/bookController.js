import { BookModel } from "../models/Book.js";

export const addBookController = async (req, res) => {
  try {
    const { name, author, imageUrl, price } = req.body;
    const createdTime = new Date();
    console.log(name, author, imageUrl, price);
    const newBook = new BookModel({
      name,
      author,
      imageUrl,
      price,
      createdTime,
    });
    await newBook.save();
    return res.json({ bookAdded: true });
  } catch (error) {
    return res.status(500);
  }
};

export const getBookController = async (req, res) => {
  try {
    const query = req.query;
    const queryKey = Object.keys(query)[0];
    console.log(queryKey);

    if (queryKey === "old") {
      var currentDate = new Date();
      var tenMinutesAgo = new Date(currentDate - 10 * 60 * 1000);
      const books = await BookModel.find({
        createdAt: { $lte: tenMinutesAgo },
      });
      return res.status(200).json({ books });
    }
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
