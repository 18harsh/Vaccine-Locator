const clinicModel = require('../models/clinicCenter');
const timeSlotsModel = require('../models/timeSlots');
const patientModel = require('../models/Patient');
const mongoose = require('mongoose');

exports.booking = (req, res, next) => {
    // console.log("-------New Line-------")
    const clinicObjectId = req.body.clinicObjectId;
    const patientObjectId = req.body.patientObjectId;
    const timeSlotId = req.body.timeSlotId;
    const date = req.body.date;
    const time_slot = req.body.time_slot;


    clinicModel.findById(clinicObjectId)
        .then((clinic) => {

            timeSlotsModel.findById(clinic.timeSlotId)
                .then(result => {

                    let i;
                    let arrayOfEventDate = [];
                    for (i = 0; i < result.eventDate.length; i++) {
                        // console.log(result.eventDate[i])
                        arrayOfEventDate.push(String(result.eventDate[i].eventDate.toISOString()));
                    }
                    // console.log(arrayOfEventDate,new Date(date).toISOString())
                    if (arrayOfEventDate.includes(new Date(date).toISOString())) {

                        return result.eventDate[arrayOfEventDate.indexOf(new Date(date).toISOString())].eventTiming

                    }


                }).then(dataForAllotment => {

                let i;
                let arrayOfAllotment = [];
                for (i = 0; i < dataForAllotment.length; i++) {
                    // console.log(result.eventDate[i])
                    if (dataForAllotment[i]._id.toString() === timeSlotId) {
                        return dataForAllotment[i].allotmentLimit[0]
                    }
                }


            }).then(Limit => {
                if (Limit === 0) {
                    res.send({"message":"Bookings are Full"})
                }
                timeSlotsModel.findOneAndUpdate({_id: clinic.timeSlotId},
                    {
                        $push: {
                            'eventDate.$[comment].eventTiming.$[reply].allottedTo': patientObjectId,

                        },
                        $set: {
                            'eventDate.$[comment].eventTiming.$[reply].allotmentLimit': Limit - 1,
                        }
                    }, {
                        arrayFilters: [{'comment.eventDate': date}, {'reply.startTime': time_slot}],
                        new: true
                    }
                ).then(result => {
                    // console.log(result)
                    let i;
                    let arrayOfEventDate = [];
                    for (i = 0; i < result.eventDate.length; i++) {
                        // console.log(result.eventDate[i])
                        arrayOfEventDate.push(String(result.eventDate[i].eventDate.toISOString()));
                    }
                    // console.log(arrayOfEventDate,new Date(date).toISOString())
                    if (arrayOfEventDate.includes(new Date(date).toISOString())) {

                        return {
                            eventDateId: result.eventDate[arrayOfEventDate.indexOf(new Date(date).toISOString())]._id,
                            eventTiming: result.eventDate[arrayOfEventDate.indexOf(new Date(date).toISOString())].eventTiming
                        }

                    }
                }).then(dataForAllotment => {

                    // console.log("dataForAllotment",dataForAllotment)
                    let i;
                    let arrayOfAllotment = [];
                    for (i = 0; i < dataForAllotment.eventTiming.length; i++) {
                        // console.log(result.eventDate[i])
                        if (dataForAllotment.eventTiming[i]._id.toString() === timeSlotId) {
                            return {
                                eventDateId: dataForAllotment.eventDateId, eventTimingSlotId: timeSlotId, timeSlotId:
                                clinic.timeSlotId
                            }
                        }
                    }

                }).then(response => {
                    patientModel.findById(patientObjectId).then(patient => {

                        patient.appointmentsBooked.push({
                            clinicName: clinic.clinicName,
                            clinicAddress: clinic.clinicAddress,
                            eventDate: date,
                            startTime: time_slot

                        })

                        clinic.patientId.push({
                            eventDate: date,
                            patientName: String(patient.firstName + " "+ patient.lastName),
                            patientPhoneNo:patient.phoneNo,
                            eventTiming:{
                                startTime:time_slot
                            }
                        })
                        clinic.save()

                        return patient.save()

                }).then(patientResponse => {

                    return patientResponse

                })
                return response
            })
            return Limit
        })


}).
then(result => {
    console.log("Printed Successfully")
})
res.send({"message": "time slots already created"})


}
