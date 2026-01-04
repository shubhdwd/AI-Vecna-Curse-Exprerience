import express from "express";
import { analyzeScore } from "../services/gemini.js";

const router = express.Router();

router.post("/analyze", async (req, res) => {
  try {
    const { score } = req.body;
    const verdict = await analyzeScore(score);
    res.json({ verdict });
  } catch (err) {
    res.status(500).json({ error: "AI analysis failed" });
  }
});

export default router;
