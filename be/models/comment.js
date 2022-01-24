const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    comment: {
        type: String,
    },
    home: {
        type: Schema.Types.ObjectId,
        ref: 'Home'
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reply: [
        {
            rep: {
                type: String
            },
            username: {
                type: String
            }
        }
    ],
    isReact: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('Comment', CommentSchema);