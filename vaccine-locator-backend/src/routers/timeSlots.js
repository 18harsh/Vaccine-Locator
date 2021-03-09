const express = require('express')
const router = new express.Router()
const timeController = require('../controller/timeController')


router.post('/clinic/addtime',timeController.addTimeSlots)

router.post('/booking/time/slots',timeController.booking)

module.exports = router;
