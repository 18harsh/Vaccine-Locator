const express = require("express");
const patientControllers = require("../controller/patient");
const router = new express.Router();
const { check, body } = require('express-validator');
const Patient = require("../models/Patient");
const validatePhoneNumber = require('validate-phone-number-node-js');

router.post("/users", [
    check('firstName')
            .isAlphanumeric()
            .withMessage('Enter A Proper Firstname').trim(),
    check('lastName')
            .isAlphanumeric()
        .withMessage('Enter A Proper Lastname').trim(),
    check('phoneNo')
        .isLength({ min: 10, max:12 })
        .withMessage('Enter A Proper PhoneNo').trim(),
        // .custom((value, { req }) => {

        //     const result = validatePhoneNumber.validate();
        //     console.log(result)
        //     if (!result) {
        //         return Promise.reject("Invalid phone no.")
        //     }

        // }),
    check('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('Enter A Proper Email-ID')
        .custom((value, { req }) => {
            return Patient
                .findOne({ email: value })
                .then(userDoc => {
                    console.log(userDoc)
                    if (userDoc) {
                        return Promise.reject("Email-Id is already Taken")
                    }
                })
        })

],patientControllers.signUp);


router.post("/users/login", patientControllers.signIn);


router.post("/patient/single", patientControllers.getSinglePatient);

router.post("/patient/time/slots", patientControllers.getTimeSlots);

module.exports = router;
