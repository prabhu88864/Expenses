import { Router } from "express";
import VoucherEntry from "../models/VoucherEntry.js";
import upload from "../middleware/upload.js";
import fs from "fs";

const router = Router();

/**
 * CREATE Voucher Entry (with image)
 */
router.post(
  "/",
  upload.single("receiptImage"),
  async (req, res) => {
    try {
      const {
        date,
        accountName,
        headId,
        headName,
        subHeadName,
        amount,
        paymentMode,
        description,
      } = req.body;

      if (
        !date ||
        !accountName ||
        !headId ||
        !headName ||
        !subHeadName ||
        !amount ||
        !paymentMode
      ) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const voucher = await VoucherEntry.create({
        date,
        accountName,
        headId,
        headName,
        subHeadName,
        amount,
        paymentMode,
        description,
        receiptImage: req.file ? req.file.filename : null,
      });

      res.status(201).json(voucher);
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "Server error" });
    }
  }
);

/**
 * GET ALL Voucher Entries
 */
router.get("/", async (_req, res) => {
  try {
    const vouchers = await VoucherEntry.find().sort({ date: -1 });
    res.json(vouchers);
  } catch (e) {
    res.status(500).json({ error: "Server error" });
  }
});

/**
 * GET ONE Voucher Entry
 */
router.get("/:id", async (req, res) => {
  try {
    const voucher = await VoucherEntry.findById(req.params.id);

    if (!voucher)
      return res.status(404).json({ error: "Voucher not found" });

    res.json(voucher);
  } catch (e) {
    res.status(400).json({ error: "Invalid ID" });
  }
});

/**
 * UPDATE Voucher Entry (image optional)
 */
router.put(
  "/:id",
  upload.single("receiptImage"),
  async (req, res) => {
    try {
      const voucher = await VoucherEntry.findById(req.params.id);
      if (!voucher)
        return res.status(404).json({ error: "Voucher not found" });

      // remove old image if new uploaded
      if (req.file && voucher.receiptImage) {
        fs.unlink(`uploads/receipts/${voucher.receiptImage}`, () => {});
      }

      const updated = await VoucherEntry.findByIdAndUpdate(
        req.params.id,
        {
          ...req.body,
          receiptImage: req.file
            ? req.file.filename
            : voucher.receiptImage,
        },
        { new: true, runValidators: true }
      );

      res.json(updated);
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "Server error" });
    }
  }
);

/**
 * DELETE Voucher Entry (and image)
 */
router.delete("/:id", async (req, res) => {
  try {
    const voucher = await VoucherEntry.findById(req.params.id);
    if (!voucher)
      return res.status(404).json({ error: "Voucher not found" });

    if (voucher.receiptImage) {
      fs.unlink(`uploads/receipts/${voucher.receiptImage}`, () => {});
    }

    await voucher.deleteOne();
    res.json({ message: "Voucher deleted successfully" });
  } catch (e) {
    res.status(400).json({ error: "Invalid ID" });
  }
});

export default router;
