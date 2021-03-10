const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Schema = mongoose.Schema;

const patientSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                console.log('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                console.log('Password cannot contain password or name')
                res.status(500).send('Password cannot contain password or name.');
            }
        }
    },
    phoneNo: {
        type: Number,
        required: true,
        validate(value) {
            if (value == 10) {
                throw new Error('Invalid Phone Number')
            }
        }
    },
    aadharNo: {
        type: String,
        required: true,
        validate(value) {
            if (value == 12) {
                throw new Error('Invalid Aadhar Number')
            }
        }
    },
    Vaccine: {
        type: Boolean,
        default: false
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    appointmentsBooked:[{
        timeSlotId: {
            type: Schema.Types.ObjectId,
            ref: 'TimeSlots',
            required: false,
        },
        eventDate: [{
            eventDate: {
                type:Schema.Types.ObjectId,
            },
            eventTiming: [{
                type:Schema.Types.ObjectId,
            }],

        }],



    }]
})

patientSchema.methods.generateAuthToken = async function () {
    const patient = this
    console.log(patient)
    const token = jwt.sign({_id:patient.id.toString()},'thisismyproject')
    patient.tokens = patient.tokens.concat({ token })
    await patient.save()
    return token
}

patientSchema.statics.findByCredentials = async (Email,Password) => {
    const patient = await Patient.findOne({email:Email})
    // console.log(patient)
    if (patient === null) {
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(Password, patient.password)
    if (!isMatch) {
        throw new Error('Unable to login')
    }
    return patient;
}

// Hash the plain text password before saving
patientSchema.pre('save', async function (next) {
    const patient = this

    if (patient.isModified('password')) {

        // user.AadharNo = await bcrypt.hash(user.AadharNo, 8);
        patient.password = await bcrypt.hash(patient.password, 8);
    }
    next()
})

const Patient = mongoose.model('Patient', patientSchema)

module.exports = Patient
