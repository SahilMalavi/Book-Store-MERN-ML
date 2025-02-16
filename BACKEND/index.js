import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/dbConnection.js";
import bookRoute from "./route/book.route.js";
const app = express();

app.use(cors());
dotenv.config();

const port = process.env.PORT || 3096;

//mongodb connect
connectDB();
app.use(express.json());

app.use("/book", bookRoute);

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
