import express from "express";
import Application from "../models/Application.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

router.get("/", async (req, res) => {
  try {
    const applications = await Application.find({ user: req.user.id })
      .populate("company")
      .populate("cv");
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch applications", error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const application = await Application.findOne({ _id: req.params.id, user: req.user.id })
      .populate("company")
      .populate("cv");
    if (!application) return res.status(404).json({ message: "Application not found" });
    res.status(200).json(application);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch application", error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const application = await Application.create({ ...req.body, user: req.user.id });
    const populatedApplication = await application.populate([{ path: "company" }, { path: "cv" }]);
    res.status(201).json(populatedApplication);
  } catch (error) {
    res.status(400).json({ message: "Failed to create application", error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { user, ...updateData } = req.body; // never let client reassign owner
    const application = await Application.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      updateData,
      { new: true, runValidators: true }
    ).populate("company").populate("cv");
    if (!application) return res.status(404).json({ message: "Application not found" });
    res.status(200).json(application);
  } catch (error) {
    res.status(400).json({ message: "Failed to update application", error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const application = await Application.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!application) return res.status(404).json({ message: "Application not found" });
    res.status(200).json({ message: "Application deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete application", error: error.message });
  }
});

export default router;