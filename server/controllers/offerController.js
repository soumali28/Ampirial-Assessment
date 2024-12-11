const express = require("express");
const Offer = require("../models/Offer");
const User = require("../models/User");

// Create a new offer
exports.createOffer = async (req, res) => {
  const {
    companyName,
    companyEmail,
    jobTitle,
    jobDescription,
    salary,
    candidateEmail,
    jobType,
    startDate,
    department,
    location,
    benefits,
    additionalNotes,
    recruiterSignature,
    candidateSignature,
  } = req.body;

  try {
    // Find the candidate by email and role
    const candidate = await User.findOne({
      email: candidateEmail,
      role: "candidate",
    });

    if (!candidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }

    // Create the offer
    const newOffer = new Offer({
      companyName,
      companyEmail,
      jobTitle,
      jobDescription,
      salary,
      candidate: candidate._id,
      jobType,
      startDate,
      department,
      location,
      benefits,
      additionalNotes,
      recruiterSignature,
      candidateSignature,
    });

    await newOffer.save();

    res.status(201).json({
      message: "Offer created successfully",
      offer: newOffer,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating offer",
      error: error.message,
    });
  }
};
