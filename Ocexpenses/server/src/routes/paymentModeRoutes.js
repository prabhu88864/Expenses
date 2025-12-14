import { Router } from "express";
import PaymentMode from "../models/PaymentMode.js";

const router = Router();

/**
 * CREATE Payment Mode
 */
router.post("/", async (req, res) => {
  try {
    const { name } = req.body;

    if (!name)
      return res.status(400).json({ error: "Name is required" });

    const existing = await PaymentMode.findOne({ name });
    if (existing)
      return res.status(409).json({ error: "Payment mode already exists" });

    const mode = await PaymentMode.create({ name });

    return res.status(201).json(mode);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Server error" });
  }
});

/**
 * READ ALL Payment Modes
 */
router.get("/", async (req, res) => {
  try {
    const modes = await PaymentMode.find().sort({ createdAt: -1 });
    return res.json(modes);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Server error" });
  }
});

/**
 * READ ONE Payment Mode
 */
router.get("/:id", async (req, res) => {
  try {
    const mode = await PaymentMode.findById(req.params.id);

    if (!mode)
      return res.status(404).json({ error: "Payment mode not found" });

    return res.json(mode);
  } catch (e) {
    console.error(e);
    res.status(400).json({ error: "Invalid ID" });
  }
});

/**
 * UPDATE Payment Mode
 */
router.put("/:id", async (req, res) => {
  try {
    const { name } = req.body;

    if (!name)
      return res.status(400).json({ error: "Name is required" });

    const updated = await PaymentMode.findByIdAndUpdate(
      req.params.id,
      { name },
      { new: true, runValidators: true }
    );

    if (!updated)
      return res.status(404).json({ error: "Payment mode not found" });

    return res.json(updated);
  } catch (e) {
    console.error(e);

    if (e.code === 11000)
      return res.status(409).json({ error: "Payment mode already exists" });

    res.status(500).json({ error: "Server error" });
  }
});

/**
 * DELETE Payment Mode
 */
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await PaymentMode.findByIdAndDelete(req.params.id);

    if (!deleted)
      return res.status(404).json({ error: "Payment mode not found" });

    return res.json({ message: "Payment mode deleted successfully" });
  } catch (e) {
    console.error(e);
    res.status(400).json({ error: "Invalid ID" });
  }
});

export default router;
