// routes/authRoutes.js
const express = require("express");
const { createOffer, updateOfferStatus } = require("../controllers/offerController");
const router = express.Router();

router.post("/create", createOffer);
router.patch("/update/status/:id", updateOfferStatus);

module.exports = router;
