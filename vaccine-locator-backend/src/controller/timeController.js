const timeSlotsModel = require('../models/timeSlots');
const clinicModel = require('../models/clinicCenter');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {validationResult} = require("express-validator");

exports.addTimeSlots = (req, res, next) => {
    // console.log("-------New Line-------")
    const clinicObjectId = req.body.clinicObjectId;
    const eventDate = req.body.eventDate;
    const start_time = req.body.start_time;
    const end_time = req.body.end_time;
    const count = req.body.count;

    const allottedTo = req.body.allottedTo;

    // console.log(timeSlotsFromClinic)
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
                        allottedTo: allottedTo,
                        allotmentLimit: count
                    },

                }
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
            console.log("------------------------------");
            console.log("-----", result.eventDate[0]);


            let i;
            let arrayOfEventDate = [];
            for (i = 0; i < result.eventDate.length; i++) {
                console.log(result.eventDate[i])
                arrayOfEventDate.push(String(result.eventDate[i].eventDate));
            }
            console.log(arrayOfEventDate)
            if (arrayOfEventDate.includes(eventDate)) {

                result.eventDate[arrayOfEventDate.indexOf(eventDate)].eventTiming.push({startTime: start_time})
                result.save()
            } else {
                result.eventDate.push({
                    eventDate: eventDate,
                    eventTiming: {
                        startTime: start_time,
                        allottedTo: [],
                        allotmentLimit: count
                    },

                })
                result.save()

            }

            res.send({"message": "Time Slot Updated"})

        })
    }).catch(err => console.log(err))

}


exports.booking = (req, res, next) => {
    // console.log("-------New Line-------")
    const clinicObjectId = req.body.clinicObjectId;
    const date = req.body.date;
    const time_slot = req.body.time_slot;


    clinicModel.findById(clinicObjectId).then((clinic) => {

        timeSlotsModel.findOneAndUpdate({_id:clinic.timeSlotId},
        {
            $addToSet : {
                'eventDate.$[comment].eventTiming.$[reply].allottedTo' : '2'
            }
        }, {
            arrayFilters : [{ 'comment.eventDate' : date}, { 'reply.startTime' : time_slot}],
                new          : true
        }
         )
            .then(result => {
                console.log(result)

                //
                // let i;
                // let arrayOfEventDate = [];
                // let j;
                // let arrayOfTimeSlotsDate = [];
                // for (i = 0; i < result[0].eventDate.length; i++) {
                //     for (j = 0; j < result[0].eventDate[i].eventTiming.length; j++) {
                //         console.log(result[0].eventDate[i].eventTiming.length)
                //         arrayOfTimeSlotsDate.push([
                //             result[0].eventDate[i].eventDate,
                //             result[0].eventDate[i].eventTiming[j].startTime
                //         ]);
                //     }
                //     // console.log(result[0].eventDate[i])
                //     arrayOfEventDate.push(String(result[0].eventDate[i].eventDate));
                // }
                // // console.log(arrayOfEventDate)
                //
                //
                // let m,k;
                // // console.log(arrayOfTimeSlotsDate)
                // for (m = 0; m < arrayOfTimeSlotsDate.length; m++) {
                //     console.log(arrayOfTimeSlotsDate[m])
                    // for (k = 0; k < arrayOfTimeSlotsDate[m]; k++) {
                    //         console.log(arrayOfTimeSlotsDate[m][k])
                    // }
                    // console.log(`obj.${prop} = ${arrayOfTimeSlotsDate[prop]}`);
                    // for (const [key, value] of Object.entries(arrayOfTimeSlotsDate[m])) {
                    //     if ((key === 'eventDate' && value === date) && (key === 'startTime' && value === time_slot)){
                    //         result.eventDate[arrayOfEventDate.indexOf(date)]
                    //                     .eventTiming[m].push({
                    //
                    //             startTime: time_slot,
                    //             allottedTo: [],
                    //             allotmentLimit: count
                    //                     })
                    //                 return result
                    //                 // result.save()
                    //     }
                  // }
                // }
                // if (arrayOfEventDate.includes(date)) {
                //
                //     if (arrayOfTimeSlotsDate.includes(date)) {
                //
                //         result.eventDate[arrayOfEventDate.indexOf(date)]
                //             .eventTiming.push({startTime: start_time})
                //         return result
                //         // result.save()
                //     }
                //     result.eventDate[arrayOfEventDate.indexOf(date)]
                //         .eventTiming.push({startTime: start_time})
                //     return result
                //     // result.save()
                // }
            }).then(response => {
                res.send(response)
            }
        )


    }).then(result => {
        console.log("Printed Successfully")
    })
    res.send({"message": "time slots already created"})


}
