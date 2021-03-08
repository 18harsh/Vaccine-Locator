const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const clinicSchema = new mongoose.Schema({
    clinicName: {
        type: String,
        required: true,
        trim: true
    },
    clinicId: {
        type: String,
        required: true,
    },
    clinicPassword: {
        type: String,
        required: true,
    },
    clinicAddress: {
        type: String,
        required: true,
        trim: true
    },
    location: {
        type: {
            type: String,
            enum: ['Point']
        },
        coordinates: {
            type: [Number],
            index: '2dsphere'
        },
        formattedAddress: String
    },
    timeSlots:{
        type:Object,
        required: false,
    },
    Open: {
        type: Boolean,
        default: true,
    },
    timeSlotId: {
        type: Schema.Types.ObjectId,
        ref: 'TimeSlots',
        required: false
    },
})
const Clinic = mongoose.model('Clinic', clinicSchema)

module.exports = Clinic
