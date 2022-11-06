const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    clientID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Client",
    },
    name: {
        type: String,
    },
    description: {
        type: String,
    },
    status: {
        type: String,
        enum: ['Not Started', 'In Progress', 'Completed']
    },
})

module.exports = mongoose.model('Project', ProjectSchema);