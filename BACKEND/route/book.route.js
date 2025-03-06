import express from "express";
import {
  getAllBooks,
  getBook,
  addBook,
} from "../controller/book.controller.js";

const router = express.Router();

router.get("/", getAllBooks);
router.post("/add", addBook);
router.get("/:id", getBook);

export default router;
