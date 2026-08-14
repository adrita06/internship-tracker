import express from "express";
import Application from "../models/Application.js";

const router = express.Router();

// GET all applications
router.get("/", async (req, res) => {
  try {
    const applications = await Application.find()
      .populate("company")
      .populate("cv");

    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch applications",
      error: error.message,
    });
  }
});

// GET one application
router.get("/:id", async (req, res) => {
  try {
    const application = await Application.findById(req.params.id)
      .populate("company")
      .populate("cv");

    if (!application) {
      return res.status(404).json({
        message: "Application not found",
      });
    }

    res.status(200).json(application);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch application",
      error: error.message,
    });
  }
});

// CREATE application
router.post("/", async (req, res) => {
  try {
    const application = await Application.create(req.body);

    const populatedApplication = await application.populate([
      { path: "company" },
      { path: "cv" },
    ]);

    res.status(201).json(populatedApplication);
  } catch (error) {
    res.status(400).json({
      message: "Failed to create application",
      error: error.message,
    });
  }
});

// UPDATE application
router.put("/:id", async (req, res) => {
  try {
    const application = await Application.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    )
      .populate("company")
      .populate("cv");

    if (!application) {
      return res.status(404).json({
        message: "Application not found",
      });
    }

    res.status(200).json(application);
  } catch (error) {
    res.status(400).json({
      message: "Failed to update application",
      error: error.message,
    });
  }
});

// DELETE application
router.delete("/:id", async (req, res) => {
  try {
    const application = await Application.findByIdAndDelete(
      req.params.id
    );

    if (!application) {
      return res.status(404).json({
        message: "Application not found",
      });
    }

    res.status(200).json({
      message: "Application deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete application",
      error: error.message,
    });
  }
});

export default router;