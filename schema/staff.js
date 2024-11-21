const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    role: {
        type: String,
        enum: ['hod', 'faculty', 'admin'], // Added 'admin' role
        required: true,
    },
    department: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
    },
});

module.exports = mongoose.model('Staff', staffSchema);
