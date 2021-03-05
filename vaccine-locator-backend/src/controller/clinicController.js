const clinicModel = require('../models/clinicCenter');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {validationResult} = require("express-validator");

exports.registerClinic = (req, res, next) => {
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //     const error = new Error('Validation failed.');
    //     error.statusCode = 422;
    //     error.data = errors.array();
    //     throw error;
    // }
    const clinicName = req.body.clinicName;
    const clinicId = req.body.clinicId;
    const clinicPassword = req.body.clinicPassword;
    const clinicAddress = req.body.clinicAddress;
    const clinicCoordinates = req.body.clinicCoordinates;
    bcrypt
        .hash(clinicPassword, 12)
        .then(hashedPw => {
            const clinic = new clinicModel({
                clinicName: clinicName,
                clinicId: clinicId,
                clinicPassword: hashedPw,
                clinicAddress: clinicAddress,
                clinicCoordinates: clinicCoordinates
            });
            return clinic.save();
        })
        .then(result => {
            res.status(201).json({message: 'User created!', clinicId: result._id});
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};


exports.getClinicCoordinates = (req, res, next) => {
    clinicModel
        .find()
        .select({ "clinicCoordinates": 1, "_id": 1})
        .then(result=>{
            res.send(result)
        })
};
