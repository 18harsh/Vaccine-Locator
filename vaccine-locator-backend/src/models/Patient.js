const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

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
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain password or name')
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
    }]
})

patientSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({_id:user.id.toString()},'thisismyproject')
    user.tokens = user.tokens.concat({ token })
    await user.save()
    return token
}

patientSchema.statics.findByCredentials = async (Email,Password) => {
    const user = await Patient.findOne({Email})
    if (!user) {
        throw new Error('Unable to login')
    }
    const isMatch = await bcrypt.compare(Password, patientSchema.Password)
    if (!isMatch) {
        throw new Error('Unable to login')
    }
    return user
}

// Hash the plain text password before saving
patientSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('Password')) {

        // user.AadharNo = await bcrypt.hash(user.AadharNo, 8);
        user.Password = await bcrypt.hash(user.Password, 8);
    }
    next()
})

const Patient = mongoose.model('Patient', patientSchema)

module.exports = Patient
