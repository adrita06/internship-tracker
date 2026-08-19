import express from "express";
import InterviewQuestion from "../models/InterviewQuestion.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();
router.use(authMiddleware);

// GET all interview questions
router.get("/", async (req, res) => {
  try {
    const { category, status, search } = req.query;
    const filter = {};

    if (category) {
      filter.category = category;
    }

    if (status) {
      filter.status = status;
    }

    if (search) {
      filter.question = { $regex: search, $options: "i" };
    }

    const questions = await InterviewQuestion.find(filter);

    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch interview questions",
      error: error.message,
    });
  }
});

// GET readiness stats per category
router.get("/readiness", async (req, res) => {
  try {
    const categories = ["HR", "Technical", "Behavioral"];

    const readiness = await Promise.all(
      categories.map(async (category) => {
        const total = await InterviewQuestion.countDocuments({ category });
        const mastered = await InterviewQuestion.countDocuments({
          category,
          status: "Mastered",
        });

        const percent = total === 0 ? 0 : Math.round((mastered / total) * 100);

        return { category, total, mastered, percent };
      })
    );

    res.status(200).json(readiness);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch readiness",
      error: error.message,
    });
  }
});

// GET one interview question
router.get("/:id", async (req, res) => {
  try {
    const question = await InterviewQuestion.findById(req.params.id);

    if (!question) {
      return res.status(404).json({
        message: "Interview question not found",
      });
    }

    res.status(200).json(question);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch interview question",
      error: error.message,
    });
  }
});

// CREATE interview question
router.post("/", async (req, res) => {
  try {
    const question = await InterviewQuestion.create(req.body);

    res.status(201).json(question);
  } catch (error) {
    res.status(400).json({
      message: "Failed to create interview question",
      error: error.message,
    });
  }
});

// UPDATE interview question
router.put("/:id", async (req, res) => {
  try {
    const question = await InterviewQuestion.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!question) {
      return res.status(404).json({
        message: "Interview question not found",
      });
    }

    res.status(200).json(question);
  } catch (error) {
    res.status(400).json({
      message: "Failed to update interview question",
      error: error.message,
    });
  }
});

// DELETE interview question
router.delete("/:id", async (req, res) => {
  try {
    const question = await InterviewQuestion.findByIdAndDelete(
      req.params.id
    );

    if (!question) {
      return res.status(404).json({
        message: "Interview question not found",
      });
    }

    res.status(200).json({
      message: "Interview question deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete interview question",
      error: error.message,
    });
  }
});

export default router;
