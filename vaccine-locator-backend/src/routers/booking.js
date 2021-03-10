const express = require("express");
const bookingControllers = require("../controller/booking");
const router = new express.Router();


router.post('/booking/time/slots',bookingControllers.booking)



module.exports = router;
