import mongoose from "mongoose";

const interviewQuestionSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: {
        values: ["HR", "Technical", "Behavioral"],
        message: "{VALUE} is not a valid interview category",
      },
    },

    question: {
      type: String,
      required: [true, "Question is required"],
      trim: true,
      maxlength: [1000, "Question cannot exceed 1000 characters"],
    },

    answerNotes: {
      type: String,
      maxlength: [5000, "Answer notes cannot exceed 5000 characters"],
    },

    status: {
      type: String,
      enum: {
        values: ["Unattempted", "Practicing", "Mastered"],
        message: "{VALUE} is not a valid interview question status",
      },
      default: "Unattempted",
    },
  },
  { timestamps: true }
);

export default mongoose.model("InterviewQuestion", interviewQuestionSchema);