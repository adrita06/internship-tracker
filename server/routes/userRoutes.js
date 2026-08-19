import express from "express";
import User from "../models/User.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

router.get("/me", async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Failed to load profile", error: error.message });
  }
});

router.put("/me", async (req, res) => {
  try {
    const { name, university, department, skills, settings } = req.body;
    const update = {};
    if (name !== undefined) update.name = name;
    if (university !== undefined) update.university = university;
    if (department !== undefined) update.department = department;
    if (skills !== undefined) update.skills = skills;
    if (settings !== undefined) update.settings = settings;

    const user = await User.findByIdAndUpdate(req.user.id, update, { new: true, runValidators: true }).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: "Failed to update profile", error: error.message });
  }
});

export default router;