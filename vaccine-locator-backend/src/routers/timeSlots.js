const express = require('express')
const router = new express.Router()
const timeController = require('../controller/timeController')


router.post('/clinic/addtime',timeController.addTimeSlots)

router.post('/get/slots',timeController.fetchSlotsForClinic)

router.post('/booking/time/slots',timeController.booking)

module.exports = router;
