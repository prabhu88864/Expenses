import mongoose from "mongoose";

const subHeadSchema = new mongoose.Schema(
  {
    headId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Head",
      required: true,
    },
    headName: {
      type: String,
      required: true,
      trim: true,
    },
    subHeadName: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

// same head lo same subhead duplicate kakunda
subHeadSchema.index(
  { headId: 1, subHeadName: 1 },
  { unique: true }
);

export default mongoose.model("SubHead", subHeadSchema);
