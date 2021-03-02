const express = require("express");
const patientControllers = require("../controller/patient");
const router = new express.Router();

router.post("/users", patientControllers.signUp);


router.post("/users/login", patientControllers.signIn);

module.exports = router;
