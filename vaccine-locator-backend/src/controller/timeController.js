const timeSlotsModel = require('../models/timeSlots');
const clinicModel = require('../models/clinicCenter');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {validationResult} = require("express-validator");

exports.addTimeSlots = (req, res, next) => {
    // console.log("-------New Line-------")
    const clinicObjectId = req.body.clinicObjectId;
    const timeSlotsFromClinic = req.body.timeSlots;
    // console.log(timeSlotsFromClinic)
    // console.log(req.body)
    var new_object = {}
    clinicModel.findById(clinicObjectId).then((clinic) => {
        if (!clinic.timeSlotId) {
            const timeModel = new timeSlotsModel({
                clinicObjectId: clinicObjectId,
                timeSlots: timeSlotsFromClinic
            })

            timeModel.save().then(result => {
                console.log(result)
                clinicModel.findById(clinicObjectId).then((clinic) => {
                    console.log(clinic)
                    clinic.timeSlotId = result._id
                    return clinic.save()
                }).then(newClinic => {

                    res.send({"message": "time slots finalized"})
                }).catch(err => console.log(err))

            }).catch(err => console.log(err))
        }
        timeSlotsModel.findById(clinic.timeSlotId).then(result => {
            // for(var i in timeSlotsFromClinic) {
            //     console.log(i)
            // }
            // console.log("timeSlotsModel",result)
            return result.timeSlots
        }).then(time_Slot_Result => {
            // console.log("-------New Line-------2")
            var arrayOftimeSlotsFromClinic = []
            for (const [key, value] of Object.entries(timeSlotsFromClinic)) {
                arrayOftimeSlotsFromClinic.push(key)
            }
            // console.log(arrayOftimeSlotsFromClinic)
            for (const [key, value] of Object.entries(time_Slot_Result)) {
                if (arrayOftimeSlotsFromClinic.includes(key)) {
                    var t;
                    t = timeSlotsFromClinic[key]
                    new_object[key] = {...time_Slot_Result[key], ...t}

                } else {
                    for (const [key, value] of Object.entries(timeSlotsFromClinic)) {
                        var obj2 = {}
                        t = timeSlotsFromClinic[key]
                        new_object = {...time_Slot_Result,...timeSlotsFromClinic}
                        // console.log(new_object)
                    }

                }
            }
            timeSlotsModel.findById(clinic.timeSlotId).then(timeSlots => {
                timeSlots.timeSlots = new_object
                return timeSlots.save()
            }).then(result => {
                console.log("Printed Successfully")
            })
        })
        res.send({"message": "time slots already created"})
    }).catch(err => console.log(err))

    // timeSlotsModel.find

}
