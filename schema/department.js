const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    hod: {
        type: mongoose.Schema.Types.ObjectId,
    },
    
});

module.exports = mongoose.model('Department', departmentSchema);
