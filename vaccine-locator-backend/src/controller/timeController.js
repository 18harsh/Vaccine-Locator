const timeSlotsModel = require('../models/timeSlots');
const clinicModel = require('../models/clinicCenter');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {validationResult} = require("express-validator");

exports.addTimeSlots = (req, res, next) => {
    // console.log("-------New Line-------")
    const clinicObjectId = req.body.clinicObjectId;
    const eventDate = req.body.eventDate;
    const start_time = req.body.startTime;
    const end_time = req.body.endTime;
    const received_count = req.body.count;


    console.log(req.body)

    var new_object = {}
    clinicModel.findById(clinicObjectId).then((clinic) => {
        if (!clinic.timeSlotId) {
            const timeModel = new timeSlotsModel({
                clinicObjectId: clinicObjectId,
                eventDate: {
                    eventDate: eventDate,
                    eventTiming: {
                        startTime: start_time,
                        endTime:end_time,
                        allottedTo: [],
                        allotmentLimit: received_count
                    },

                }
            })

            timeModel.save().then(result => {
                // console.log(result)
                clinicModel.findById(clinicObjectId).then((clinic) => {
                    // console.log(clinic)
                    clinic.timeSlotId = result._id
                    return clinic.save()
                }).then(newClinic => {

                    res.send({"message": "time slots finalized"})
                }).catch(err => console.log(err))

            }).catch(err => console.log(err))
        }
        timeSlotsModel.findById(clinic.timeSlotId).then(result => {
            console.log(received_count)


            let i;
            let arrayOfEventDate = [];
            for (i = 0; i < result.eventDate.length; i++) {
                // console.log(result.eventDate[i])
                arrayOfEventDate.push(String(result.eventDate[i].eventDate.toISOString()));
            }
            console.log(arrayOfEventDate,eventDate)
            if (arrayOfEventDate.includes(eventDate)) {

                result.eventDate[arrayOfEventDate.indexOf(eventDate)].eventTiming.push({
                    allotmentLimit: received_count,
                    startTime: start_time,
                    endTime:end_time
                })
                result.save()
            } else {
                result.eventDate.push({
                    eventDate: eventDate,
                    eventTiming: {
                        startTime: start_time,
                        endTime:end_time,
                        allottedTo: [],
                        allotmentLimit: received_count
                    },

                })
                result.save()

            }

            res.send({"message": "Time Slot Updated"})

        })
    }).catch(err => console.log(err))

}

exports.fetchSlotsForClinic = (req, res, next) => {
    const clinciObjectId = req.body.clinicObjectId;

    clinicModel.findById(clinciObjectId).then((clinic) => {
        if (!clinic.timeSlotId) {
            res.send({"message":"No Slots"})
        }
        timeSlotsModel.findById(clinic.timeSlotId).then(result =>{
            res.send(result.eventDate)
        })

    }).then(result => {
        console.log(result)

    })


}


