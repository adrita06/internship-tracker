import express from "express";
import User from "../models/User.js";

const router = express.Router();

router.get("/demo", async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { email: "demo@example.com" },
      {
        name: "Demo User",
        email: "demo@example.com",
        password: "demo-password",
        university: "IUT",
        department: "CSE",
        skills: ["React", "Node.js", "MongoDB"],
      },
      {
        returnDocument: "after",
        upsert: true,
        runValidators: true,
        setDefaultsOnInsert: true,
      }
    );

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      message: "Failed to load demo user",
      error: error.message,
    });
  }
});

export default router;
