// routes/authRoutes.js
const express = require("express");
const { createOffer } = require("../controllers/offerController");
const router = express.Router();

router.post("/create", createOffer);

module.exports = router;
