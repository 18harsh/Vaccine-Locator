const express = require('express')
const router = new express.Router()
const timeController = require('../controller/timeController')


router.post('/clinic/add/time',timeController.addTimeSlots)

router.post('/get/slots',timeController.fetchSlotsForClinic)



module.exports = router;
