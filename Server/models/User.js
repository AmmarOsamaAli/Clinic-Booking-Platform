const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minLength: 3,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim:  true,
    },
    hashedPassword: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        enum: ['admin', 'patient', 'doctor'],
        default: 'patient'
    },
    isBlocked: {
        type: Boolean,
        default: false,
    },

}, {timestamps: true})

const User = mongoose.model('User', userSchema)

module.exports = User