const express = require('express')
const router = new express.Router()
const timeController = require('../controller/timeController')


router.post('/clinic/addtime',timeController.addTimeSlots)


module.exports = router;
