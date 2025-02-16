import express from "express";
import { getBooks, addBook } from "../controller/book.controller.js";

const router = express.Router();

router.get("/", getBooks);
router.post("/add", addBook);

export default router;
