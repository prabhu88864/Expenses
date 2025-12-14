import { Router } from "express";
import SubHead from "../models/SubHead.js";
import Head from "../models/Head.js";

const router = Router();

/**
 * CREATE Sub Head
 */
router.post("/", async (req, res) => {
  try {
    const { headId, subHeadName } = req.body;

    if (!headId || !subHeadName) {
      return res
        .status(400)
        .json({ error: "Head and sub head name required" });
    }

    const head = await Head.findById(headId);
    if (!head) {
      return res.status(404).json({ error: "Head not found" });
    }

    const subHead = await SubHead.create({
      headId: head._id,
      headName: head.name, // 👈 NAME STORE CHESTUNNAM
      subHeadName,
    });

    return res.status(201).json(subHead);
  } catch (e) {
    console.error(e);

    if (e.code === 11000) {
      return res
        .status(409)
        .json({ error: "Sub head already exists for this head" });
    }

    res.status(500).json({ error: "Server error" });
  }
});

/**
 * GET ALL Sub Heads
 */
router.get("/", async (_req, res) => {
  try {
    const subHeads = await SubHead.find().sort({ createdAt: -1 });
    return res.json(subHeads);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Server error" });
  }
});

/**
 * GET Sub Heads by Head
 */
router.get("/by-head/:headId", async (req, res) => {
  try {
    const subHeads = await SubHead.find({
      headId: req.params.headId,
    });

    return res.json(subHeads);
  } catch (e) {
    console.error(e);
    res.status(400).json({ error: "Invalid head ID" });
  }
});

/**
 * UPDATE Sub Head
 */
router.put("/:id", async (req, res) => {
  try {
    const { headId, subHeadName } = req.body;

    if (!headId || !subHeadName) {
      return res
        .status(400)
        .json({ error: "Head and sub head name required" });
    }

    const head = await Head.findById(headId);
    if (!head) {
      return res.status(404).json({ error: "Head not found" });
    }

    const updated = await SubHead.findByIdAndUpdate(
      req.params.id,
      {
        headId: head._id,
        headName: head.name,
        subHeadName,
      },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ error: "Sub head not found" });
    }

    return res.json(updated);
  } catch (e) {
    console.error(e);

    if (e.code === 11000) {
      return res
        .status(409)
        .json({ error: "Sub head already exists for this head" });
    }

    res.status(500).json({ error: "Server error" });
  }
});

/**
 * DELETE Sub Head
 */
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await SubHead.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ error: "Sub head not found" });
    }

    return res.json({ message: "Sub head deleted successfully" });
  } catch (e) {
    console.error(e);
    res.status(400).json({ error: "Invalid ID" });
  }
});

export default router;
