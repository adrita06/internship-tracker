import express from "express";
import Company from "../models/Company.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();
router.use(authMiddleware);

router.get("/", async (_req, res) => {
  try {
    res.json(await Company.find({ user: req.user.id }).sort({ name: 1 }));
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch companies", error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const company = await Company.findOne({ _id: req.params.id, user: req.user.id });
    if (!company) return res.status(404).json({ message: "Company not found" });
    res.json(company);
  } catch (error) {
    res.status(400).json({ message: "Invalid company id", error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const company = await Company.create({ ...req.body, user: req.user.id });
    res.status(201).json(company);
  } catch (error) {
    res.status(400).json({ message: "Failed to create company", error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const company = await Company.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!company) return res.status(404).json({ message: "Company not found" });
    res.json(company);
  } catch (error) {
    res.status(400).json({ message: "Failed to update company", error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const company = await Company.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!company) return res.status(404).json({ message: "Company not found" });
    res.json({ message: "Company deleted" });
  } catch (error) {
    res.status(400).json({ message: "Failed to delete company", error: error.message });
  }
});

export default router;
