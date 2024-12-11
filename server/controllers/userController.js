const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Offer = require("../models/Offer");

// exports.getUsers = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { role } = req.query;

//     if (!["recruiter", "candidate"].includes(role)) {
//       return res.status(400).json({ message: "Invalid role specified" });
//     }

//     const user = await User.findOne({ _id: id, role });

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     res.status(200).json(user);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

exports.getRecruiters = async (req, res) => {
  const { email } = req.query;
  try {
    if (!email) {
      return res
        .status(400)
        .json({ message: "Candidate email query parameter is required." });
    }

    // Find offers based on candidate email
    const offers = await Offer.find()
      .populate({
        path: "candidate",
        match: { email }, // Filter by candidate's email
        select: "name email", // Include candidate details
      })
      .exec();

    const filteredOffers = offers.filter((offer) => offer.candidate !== null);

    if (filteredOffers.length === 0) {
      return res.status(200).json({
        message: "No offers found for the provided candidate email.",
        offers: [],
      });
    }
    const recruiterEmails = filteredOffers.map((offer) => offer.companyEmail);
    const recruiters = await User.find({
      email: { $in: recruiterEmails },
      role: "recruiter",
    });

    const response = {
      email,
      recruiters,
      offers: filteredOffers,
    };

    res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching offers and recruiters:", error);
    res.status(500).json({ message: "Server error." });
  }
};

exports.getCandidates = async (req, res) => {
  try {
    const candidates = await User.aggregate([
      {
        $match: { role: "candidate" }, // Filter users with role 'candidate'
      },
      {
        $lookup: {
          from: "offers",
          localField: "_id",
          foreignField: "candidate",
          as: "offers",
        },
      },
    ]);

    res.status(200).json(candidates);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getCandidate = async (req, res) => {
  try {
    const { id } = req.params;

    const candidate = await User.findById(id);

    if (!candidate || candidate.role !== "candidate") {
      return res.status(400).json({ message: "Candidate not found" });
    }

    res.status(200).json(candidate);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
// exports.getOffersByRecruiter = async (req, res) => {
//   try {
//     const { recruiterId } = req.params;

//     const recruiter = await User.findById(recruiterId).populate("offers");

//     if (!recruiter || recruiter.role !== "recruiter") {
//       return res.status(400).json({ message: "Recruiter not found" });
//     }

//     res.status(200).json(recruiter.offers);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error" });
//   }
// };
