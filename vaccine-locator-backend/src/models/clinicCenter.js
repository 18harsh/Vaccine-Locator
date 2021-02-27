const mongoose = require('mongoose')

const clinicSchema = new mongoose.Schema({
        clinicName: {
            type: String,
            required: true,
            trim: true
        },
        clinicAddress: {
            type: String,
            required: true,
        },
        Area: {
            type: String,
            required: true,
            trim: true
        },
        City: {
            type: String,
            required: true,
            trim: true
        },
        Open: {
            type: Boolean,
            default: true,
        }
})
const Clinic = mongoose.model('Clinic',clinicSchema)

module.exports = Clinic