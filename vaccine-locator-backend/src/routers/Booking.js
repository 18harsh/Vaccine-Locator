const express = require("express");
const bookingControllers = require("../controller/Booking");
const router = new express.Router();
const { check, body } = require('express-validator');
const Patient = require("../models/Patient");


router.post("/booking/distance", bookingControllers.getNearestClinics);

module.exports = router;
