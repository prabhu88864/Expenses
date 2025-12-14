import { Router } from "express";
import Head from "../models/Head.js";

const router = Router();

/**
 * CREATE Head
 */
router.post("/", async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Name is required" });
    }

    const exists = await Head.findOne({ name });
    if (exists) {
      return res.status(409).json({ error: "Head already exists" });
    }

    const head = await Head.create({ name });
    return res.status(201).json(head);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Server error" });
  }
});

/**
 * GET ALL Heads
 */
router.get("/", async (_req, res) => {
  try {
    const heads = await Head.find().sort({ createdAt: -1 });
    return res.json(heads);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Server error" });
  }
});

/**
 * GET ONE Head
 */
router.get("/:id", async (req, res) => {
  try {
    const head = await Head.findById(req.params.id);

    if (!head) {
      return res.status(404).json({ error: "Head not found" });
    }

    return res.json(head);
  } catch (e) {
    console.error(e);
    res.status(400).json({ error: "Invalid ID" });
  }
});

/**
 * UPDATE Head
 */
router.put("/:id", async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Name is required" });
    }

    const updated = await Head.findByIdAndUpdate(
      req.params.id,
      { name },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ error: "Head not found" });
    }

    return res.json(updated);
  } catch (e) {
    console.error(e);
    if (e.code === 11000) {
      return res.status(409).json({ error: "Head already exists" });
    }
    res.status(500).json({ error: "Server error" });
  }
});

/**
 * DELETE Head
 */
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Head.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ error: "Head not found" });
    }

    return res.json({ message: "Head deleted successfully" });
  } catch (e) {
    console.error(e);
    res.status(400).json({ error: "Invalid ID" });
  }
});

export default router;
