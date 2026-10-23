const mongoose = require('mongoose')
const AvailabilitySlot = require('./AvailabilitySlot')
const Doctor = require('./Doctor')
const User = require('./User')

const appointmentSchema = new mongoose.Schema({
    status: {
        type: String,
        required: true,
        enum: ['confirmed', 'declined', 'cancelled', 'pending'],
        default: 'pending'
    },
    timeSlot: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AvailabilitySlot'
    },
    doctor: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor'
    },
    patient: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }

}, {timestamps: true})


const Appointment = mongoose.model('Appointment', appointmentSchema)

module.exports = Appointment