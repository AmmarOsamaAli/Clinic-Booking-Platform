const mongoose = require('mongoose')
const User = require('./User.js')
const Speciality = require('./Speciality')

const doctorSchema = new mongoose.Schema({
    bio: {
        type: String,
        required: true,
        minLength: 20,
        maxLength: 200
    },
    isActive: {
        type: Boolean,
        default: true
    },
    speciality: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Speciality'
    },
    user: {
        required: true,
        unique: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }

}, {timestamps: true})

const Doctor = mongoose.model('Doctor', doctorSchema)

module.exports = Doctor