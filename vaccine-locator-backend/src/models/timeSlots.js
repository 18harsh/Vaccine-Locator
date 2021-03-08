const mongoose = require('mongoose')

const timeSchema = new mongoose.Schema({
    clinicObjectId: {
        type: Schema.Types.ObjectId, 
        ref: 'Clinics',
        required: true
    },
    timeSlots:{
    
        type:Object,
        required: false,
           
    }
})
const TimeSlots = mongoose.model('TimeSlots', timeSchema)

module.exports = TimeSlots
