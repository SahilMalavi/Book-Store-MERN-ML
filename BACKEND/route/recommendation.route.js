import express from "express";
import axios from "axios";
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { title } = req.body;  
    console.log(title);

    const response = await axios.post("http://127.0.0.1:5000/recommend", {
      title
    });

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching recommendations" });
  }
});

export default router;
