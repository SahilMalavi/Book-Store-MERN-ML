import Book from "../model/book.model.js";

export const getBooks = async (req, res) => {
  try {
    const book = await Book.find();
    res.status(200).json(book);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export const addBook = async (req, res) => {
  try {
    const { title, author, category, description, price, image } = req.body;

    if (!title || !author || !category || !description || !price || !image) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newBook = new Book({
      title,
      author,
      category,
      description,
      price,
      image,
    });

    newBook.save();

    res.status(200).json({ message: "New Book Added Successfully", book: newBook });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error adding book", error });
  }
};
