import mongoose from "mongoose";

const hrContactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, trim: true },
    mobile: { type: String, trim: true, maxlength: 30 },
    linkedin: { type: String, trim: true },
  },
  { _id: true }
);

const companySchema = new mongoose.Schema(
  {
    user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: [true, "User is required"],
    },
    name: { type: String, required: true, trim: true, maxlength: 100 },
    industry: { type: String, trim: true },
    website: { type: String, trim: true },
    location: { type: String, trim: true },
    notes: { type: String, trim: true, maxlength: 500 },
    hrContacts: { type: [hrContactSchema], default: [] },
  },
  { timestamps: true }
);

export default mongoose.model("Company", companySchema);
