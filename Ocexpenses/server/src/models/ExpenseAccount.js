import mongoose from "mongoose";

const expenseAccountSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    paymentModes: {
      type: [String], // 👈 ARRAY
    
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("ExpenseAccount", expenseAccountSchema);
