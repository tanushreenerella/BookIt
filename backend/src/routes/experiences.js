import express from "express";
import Experience from "../models/Experience.js";
const router = express.Router();


// GET /experiences
router.get("/", async (req, res) => {
  try {
    const list = await Experience.find().lean();
    res.json(list);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// GET /experiences/:id
router.get("/:id", async (req, res) => {
  try {
    const exp = await Experience.findById(req.params.id).lean();
    if (!exp) return res.status(404).json({ error: "Not found" });
    res.json(exp);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;