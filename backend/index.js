import "dotenv/config";

import express from "express";
import cors from "cors";

import aiRoutes from "./routes/ai.js";
import leaderboardRoutes from "./routes/leaderboard.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/ai", aiRoutes);
app.use("/api/leaderboard", leaderboardRoutes);

app.get("/", (req, res) => {
  res.send("Vecna Backend Running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Backend running on http://localhost:" + PORT);
});
