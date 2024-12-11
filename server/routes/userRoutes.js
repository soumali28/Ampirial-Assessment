// routes/authRoutes.js
const express = require("express");
const { getUsers, getCandidates, getRecruiters, getCandidate } = require("../controllers/userController");
const router = express.Router();

// router.get("/:id", getUsers);
router.get("/recruiters", getRecruiters);
router.get("/candidates", getCandidates);
router.get("/candidates/:id", getCandidate);

module.exports = router;
