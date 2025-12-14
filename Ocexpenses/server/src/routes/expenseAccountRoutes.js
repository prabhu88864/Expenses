import { Router } from "express";
import ExpenseAccount from "../models/ExpenseAccount.js";

const router = Router();

/**
 * CREATE Expense Account
 */
router.post("/", async (req, res) => {
  try {
    const { name, paymentModes } = req.body;

    if (!name || !paymentModes || !paymentModes.length) {
      return res.status(400).json({ error: "Name and payment modes required" });
    }

    const account = await ExpenseAccount.create({
      name,
      paymentModes,
    });

    return res.status(201).json(account);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Server error" });
  }
});

/**
 * GET ALL Expense Accounts
 */
router.get("/", async (_req, res) => {
  try {
    const accounts = await ExpenseAccount.find().sort({ createdAt: -1 });
    return res.json(accounts);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Server error" });
  }
});

/**
 * GET ONE Expense Account
 */
router.get("/:id", async (req, res) => {
  try {
    const account = await ExpenseAccount.findById(req.params.id);

    if (!account) {
      return res.status(404).json({ error: "Expense account not found" });
    }

    return res.json(account);
  } catch (e) {
    console.error(e);
    res.status(400).json({ error: "Invalid ID" });
  }
});

/**
 * UPDATE Expense Account
 */
router.put("/:id", async (req, res) => {
  try {
    const { name, paymentModes } = req.body;

    if (!name || !paymentModes || !paymentModes.length) {
      return res.status(400).json({ error: "Name and payment modes required" });
    }

    const updated = await ExpenseAccount.findByIdAndUpdate(
      req.params.id,
      { name, paymentModes },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ error: "Expense account not found" });
    }

    return res.json(updated);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Server error" });
  }
});

/**
 * DELETE Expense Account
 */
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await ExpenseAccount.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ error: "Expense account not found" });
    }

    return res.json({ message: "Expense account deleted successfully" });
  } catch (e) {
    console.error(e);
    res.status(400).json({ error: "Invalid ID" });
  }
});

export default router;
