import mongoose from "mongoose";

const voucherEntrySchema = new mongoose.Schema(
  {
    date: { type: Date, required: true },
    accountName: { type: String, required: true },

    headId: { type: mongoose.Schema.Types.ObjectId, required: true },
    headName: { type: String, required: true },
    subHeadName: { type: String, required: true },

    amount: { type: Number, required: true },
    paymentMode: { type: String, required: true },

    description: { type: String },

    receiptImage: {
      type: String, // filename / url
    },
  },
  { timestamps: true }
);

export default mongoose.model("VoucherEntry", voucherEntrySchema);
