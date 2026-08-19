import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [50, "Name cannot exceed 50 characters"],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
    },

    university: {
      type: String,
      trim: true,
      default: "IUT",
    },

    department: {
      type: String,
      trim: true,
    },

    skills: {
      type: [String],
      default: [],
    },

    settings: {
      emailNotifications: { type: Boolean, default: true },
      reminderDays: { type: Number, default: 3, min: 0 },
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
