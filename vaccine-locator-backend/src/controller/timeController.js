const timeSlotsModel = require('../models/timeSlots');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {validationResult} = require("express-validator");

exports.addTimeSlots = (req, res, next) => {
    const clinicObjectId = req.body.clinicObjectId;
    const timeSlots = req.body.timeSlots;

    console.log(req.body)
 }