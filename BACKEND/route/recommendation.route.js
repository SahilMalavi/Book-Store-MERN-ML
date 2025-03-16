import express from "express";
import axios from "axios";
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { title } = req.body;
    const response = await axios.post(
      "https://flask-app-bookstore.up.railway.app/recommend",
      {
        title,
      }
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching recommendations" });
  }
});

export default router;
