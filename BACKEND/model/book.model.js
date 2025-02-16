import mongoose from "mongoose";

const bookSchema = mongoose.Schema({
    title: String,
    author: String,
    category: String,
    description: String,
    price: Number,
    image: String
})
 
const book = mongoose.model("Books", bookSchema);

export default book;