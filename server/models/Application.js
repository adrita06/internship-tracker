import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
    },

    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: [true, "Company is required"],
    },

    cv: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CV",
    },

    position: {
      type: String,
      required: [true, "Position is required"],
      trim: true,
      maxlength: [100, "Position cannot exceed 100 characters"],
    },

    status: {
      type: String,
      enum: {
        values: [
          "Wishlist",
          "Applied",
          "HR Screening",
          "Interview",
          "Offer",
          "Rejected",
        ],
        message: "{VALUE} is not a valid application status",
      },
      default: "Wishlist",
    },

    applicationDate: {
      type: Date,
      default: Date.now,
    },

    jobDescription: {
      type: String,
      maxlength: [5000, "Job description cannot exceed 5000 characters"],
    },

    fitScore: {
      type: Number,
      min: [0, "FitScore cannot be less than 0"],
      max: [100, "FitScore cannot exceed 100"],
      default: 0,
    },

    interviewNotes: {
      type: String,
      maxlength: [2000, "Interview notes cannot exceed 2000 characters"],
    },

    experience: {
      type: String,
      maxlength: [2000, "Experience cannot exceed 2000 characters"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Application", applicationSchema);