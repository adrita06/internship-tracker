import mongoose from "mongoose";

const cvSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
    },

    title: {
      type: String,
      required: [true, "CV title is required"],
      trim: true,
      maxlength: [50, "Title cannot exceed 50 characters"],
    },

    fileUrl: {
      type: String,
    },

    skills: {
      type: [String],
      default: [],
    },

    notes: {
      type: String,
      maxlength: [500, "Notes cannot exceed 500 characters"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("CV", cvSchema);