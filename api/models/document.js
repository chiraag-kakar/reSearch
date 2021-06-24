const mongoose = require('mongoose');

const DocumentSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    tags: {
        type: [String],
        index: true
    }
});

module.exports = mongoose.model('Document', DocumentSchema);