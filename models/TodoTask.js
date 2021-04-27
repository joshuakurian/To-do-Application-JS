const mongoose = require('mongoose');
const todoTaskSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    createdby: {
        type: String,
        required: true
    },
    createdon: {
        type: Date,
        default: Date.now
    },
    completed: {
        type: Date,
        default: Date.now
    }
})
module.exports = mongoose.model('TodoTask',todoTaskSchema);