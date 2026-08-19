import express from "express";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import upload from "../config/upload.js";
import CV from "../models/CV.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadDir = path.join(__dirname, "..", "uploads");

const parseSkills = (skills = "") =>
  skills.split(",").map((skill) => skill.trim()).filter(Boolean);

router.use(authMiddleware);

router.get("/", async (req, res) => {
  try {
    const cvs = await CV.find({ user: req.user.id }).sort({ createdAt: -1 }).populate("user");
    res.status(200).json(cvs);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch CVs", error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const cv = await CV.findOne({ _id: req.params.id, user: req.user.id }).populate("user");
    if (!cv) return res.status(404).json({ message: "CV not found" });
    res.status(200).json(cv);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch CV", error: error.message });
  }
});

router.post("/", upload.single("file"), async (req, res) => {
  try {
    const cv = await CV.create({
      user: req.user.id,
      title: req.body.title,
      skills: parseSkills(req.body.skills),
      notes: req.body.notes,
      fileUrl: req.file ? `/uploads/${req.file.filename}` : "",
    });
    const populatedCV = await cv.populate("user");
    res.status(201).json(populatedCV);
  } catch (error) {
    res.status(400).json({ message: "Failed to create CV", error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const cv = await CV.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { title: req.body.title, skills: parseSkills(req.body.skills), notes: req.body.notes },
      { new: true, runValidators: true }
    ).populate("user");
    if (!cv) return res.status(404).json({ message: "CV not found" });
    res.status(200).json(cv);
  } catch (error) {
    res.status(400).json({ message: "Failed to update CV", error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const cv = await CV.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!cv) return res.status(404).json({ message: "CV not found" });
    if (cv.fileUrl) {
      const filePath = path.join(uploadDir, path.basename(cv.fileUrl));
      await fs.unlink(filePath).catch(() => {});
    }
    res.status(200).json({ message: "CV deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete CV", error: error.message });
  }
});

export default router;