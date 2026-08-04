import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Company name is required"],
      trim: true,
      maxlength: [100, "Company name cannot exceed 100 characters"],
    },

    industry: {
      type: String,
      trim: true,
    },

    website: {
      type: String,
      trim: true,
      match: [
        /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/.*)?$/,
        "Please enter a valid website URL",
      ],
    },

    location: {
      type: String,
      trim: true,
    },

    hrContacts: [
      {
        name: {
          type: String,
          required: [true, "HR contact name is required"],
        },

        email: {
          type: String,
          match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
        },

        linkedin: String,
      },
    ],

    notes: {
      type: String,
      maxlength: [500, "Notes cannot exceed 500 characters"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Company", companySchema);