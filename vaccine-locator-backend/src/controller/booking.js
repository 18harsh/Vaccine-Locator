const clinicModel = require('../models/clinicCenter');
const timeSlotsModel = require('../models/timeSlots');


exports.booking = (req, res, next) => {
    // console.log("-------New Line-------")
    const clinicObjectId = req.body.clinicObjectId;
    const patientObjectId = req.body.patientObjectId;
    const date = req.body.date;
    const time_slot = req.body.time_slot;


    clinicModel.findById(clinicObjectId).then((clinic) => {

        timeSlotsModel.findOneAndUpdate({_id:clinic.timeSlotId},
            {
                $addToSet : {
                    'eventDate.$[comment].eventTiming.$[reply].allottedTo' : '2',

                },
                $set:{
                    'eventDate.$[comment].eventTiming.$[reply].allotmentLimit' : '5',
                }
            }, {
                arrayFilters : [{ 'comment.eventDate' : date}, { 'reply.startTime' : time_slot}],
                new          : true
            }
        )
            .then(result => {
                console.log(result)

            }).then(response => {
                res.send(response)
            }
        )


    }).then(result => {
        console.log("Printed Successfully")
    })
    res.send({"message": "time slots already created"})


}
