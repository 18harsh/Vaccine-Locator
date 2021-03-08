const express = require("express");
const bookingControllers = require("../controller/booking");
const router = new express.Router();
const { check, body } = require('express-validator');
const Patient = require("../models/Patient");





module.exports = router;
