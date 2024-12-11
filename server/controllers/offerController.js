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
      status: "pending",
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

exports.updateOfferStatus = async (req, res) => {
  const { id } = req.params;
  const { status, signature } = req.body;
  const offerId = id;
  try {
    if (!["pending", "accepted", "rejected"].includes(status)) {
      return res.status(400).json({
        message:
          "Invalid status. Allowed values are 'pending', 'accepted', or 'rejected'.",
      });
    }
    const offer = await Offer.findById(offerId);
    if (!offer) {
      return res.status(404).json({ message: "Offer not found." });
    }

    offer.status = status;
    if (status === "accepted") {
      if (!signature) {
        return res.status(400).json({
          message: "Signature is required for accepting the offer.",
        });
      }
      offer.candidateSignature = signature;
    }
    await offer.save();

    res.status(200).json({
      message: "Offer status updated successfully.",
      offer,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating offer status.",
      error: error.message,
    });
  }
};
