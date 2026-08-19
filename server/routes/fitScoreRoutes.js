import express from "express";
import CV from "../models/CV.js";
import { calculateFitScore } from "../utils/fitScore.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { cvId, jobDescription } = req.body;

    if (!cvId) {
      return res.status(400).json({
        message: "CV is required",
      });
    }

    if (!jobDescription?.trim()) {
      return res.status(400).json({
        message: "Job description is required",
      });
    }

    const cv = await CV.findById(cvId);

    if (!cv) {
      return res.status(404).json({
        message: "CV not found",
      });
    }

    const result = calculateFitScore(cv.skills, jobDescription);

    res.status(200).json({
      cv,
      jobDescription,
      ...result,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to calculate FitScore",
      error: error.message,
    });
  }
});

export default router;
