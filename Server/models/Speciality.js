const mongoose = require('mongoose')


const specialitySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 4
    },
    description: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {timestamps: true})


const Speciality = mongoose.model('Speciality', specialitySchema)

module.exports = Speciality