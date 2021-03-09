const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const timeSchema = new mongoose.Schema({
    clinicObjectId: {
        type: Schema.Types.ObjectId,
        ref: 'Clinics',
        required: true
    },
    eventDate: [{
        eventDate: {
            type:String
        },
        eventTiming: [{
            startTime: {type: String, required: true},
            allottedTo: [{type: String}],
            allotmentLimit:[{type:Number}]
        }],

    }],

})
const TimeSlots = mongoose.model('TimeSlots', timeSchema)

module.exports = TimeSlots
