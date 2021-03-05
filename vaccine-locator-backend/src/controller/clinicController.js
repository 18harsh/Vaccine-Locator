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

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {

    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1);  // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2)
    ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
}

function deg2rad(deg) {
    return deg * (Math.PI / 180)
}

exports.getClinicCoordinates = (req, res, next) => {
    const originLatitude = req.body.latitude;
    const originLongitude = req.body.longitude;


    clinicModel
        .find()
        .select({"clinicCoordinates": 1, "_id": 1})
        .then(result => {
            var distance_array = [];
            result.forEach(res => {

                console.log(res.clinicCoordinates)
                const destinationLatitude = res.clinicCoordinates.latitude;
                const destinationLongitude = res.clinicCoordinates.longitude;

                const distance = getDistanceFromLatLonInKm(
                    originLatitude,
                    originLongitude,
                    destinationLatitude,
                    destinationLongitude)
                if (distance <= 5) {
                    var object={}
                    object["_id"] = res._id
                    object["clinicCoordinates"] =res.clinicCoordinates
                    object["distance"] =distance
                    distance_array.push(object)
                }

            })
            res.send(distance_array)
        })
};
