import mongoose from "mongoose";

const bookSchema = mongoose.Schema({
  isbn: String,
  title: String,
  author: String,
  category: String,
  year_of_publication: String,
  publisher: String,
  description: String,
  image: String,
});

const Book = mongoose.model("newbooks", bookSchema);

export default Book;
