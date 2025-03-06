import Book from "../model/book.model.js";

export const getBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getAllBooks = async (req, res) => {
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
    const {
      isbn,
      title,
      author,
      year_of_publication,
      publisher,
      category,
      description,
      image,
    } = req.body;

    if (
      !isbn ||
      !title ||
      !author ||
      !year_of_publication ||
      !publisher ||
      !category ||
      !description ||
      !image
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newBook = new Book({
      isbn,
      title,
      author,
      year_of_publication,
      publisher,
      category,
      description,
      image,
    });

    await newBook.save();

    res
      .status(200)
      .json({ message: "New Book Added Successfully", book: newBook });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding book", error });
  }
};
