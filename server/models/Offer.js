// models/Offer.js
const mongoose = require("mongoose");

const OfferSchema = new mongoose.Schema(
  {
    companyName: { type: String, required: true },
    companyEmail: { type: String, required: true },
    jobTitle: { type: String, required: true },
    jobDescription: { type: String, required: true },
    salary: { type: String, required: true },
    candidate: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    jobType: {
      type: String,
      enum: ["full-time", "part-time", "contract", "internship"],
      required: true,
    },
    startDate: { type: Date, required: true },
    department: { type: String },
    location: { type: String },
    benefits: { type: [String], default: [] },
    additionalNotes: { type: String },
    recruiterSignature: { type: String },
    candidateSignature: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Offer", OfferSchema);
