// routes/authRoutes.js
const express = require("express");
const { getUsers, getCandidates, getRecruiters } = require("../controllers/userController");
const router = express.Router();

// router.get("/:id", getUsers);
router.get("/recruiters", getRecruiters);
router.get("/candidates", getCandidates);

module.exports = router;
