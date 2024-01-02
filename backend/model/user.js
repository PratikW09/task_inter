const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Invalid email format']
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
        unique: true,
        match: [/^[0-9]+$/, 'Phone should contain numbers only']
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Others'],
    },
    howDidYouHear: [String],
    city: {
        type: String,
        enum: ['Mumbai', 'Pune', 'Ahmedabad'],
    },
    state: {
        type: String,
        enum: ['Gujarat', 'Maharashtra', 'Karnataka'],
    },
    Add_user: [{
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        }
    }]
}, { 
    timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;
