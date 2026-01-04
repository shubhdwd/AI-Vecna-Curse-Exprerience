import express from "express";
import { db } from "../services/db.js";
import { analyzeScore } from "../services/gemini.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { name, score } = req.body;

  const verdict = await analyzeScore(score);

  await db.collection("leaderboard").add({
    name,
    score,
    verdict,
    createdAt: Date.now(),
  });

  res.json({ verdict });
});

router.get("/", async (req, res) => {
  const snapshot = await db
    .collection("leaderboard")
    .orderBy("score", "desc")
    .limit(10)
    .get();

  const data = snapshot.docs.map(doc => doc.data());
  res.json(data);
});

export default router;
