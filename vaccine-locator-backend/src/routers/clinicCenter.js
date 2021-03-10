const express = require('express')
const router = new express.Router()
const clinicController = require('../controller/clinicController')
// router.post('/center', async (req, res) => {
//     const clinic = new Clinic(req.body)

//     try {
//         await clinic.save()
//         res.status(201).send({clinic})
//     } catch (e) {
//         res.status(400).send(e)
//     }
// })

router.post('/register/clinic',clinicController.registerClinic)

router.post('/login/clinic',clinicController.loginClinic)

router.post('/clinic/single',clinicController.getSingleClinic)

router.post("/clinic/patients", clinicController.getPatientsForClinic);

router.post("/clinic/location", clinicController.getNearestClinics);

module.exports = router;
