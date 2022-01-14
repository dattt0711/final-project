const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    content: {
        type: String,
    },
    home: {
        type: Schema.Types.ObjectId,
        ref: 'Home'
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = mongoose.model('Comment', CommentSchema);