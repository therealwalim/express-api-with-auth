const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title:{type: String},
    description:{type: String},
    content:{type: String},
    thumbnail:{type: String},
    created_by : {type: String},
    created_at:{ type: Date, default: Date.now},
});

module.exports = mongoose.model('Post', postSchema);