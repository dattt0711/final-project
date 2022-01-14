const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HomeSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    home: {
        type: String,
    },
    positions: [{
        type: Schema.Types.ObjectId,
        ref: 'Position'
    }],
    items: [{
        type: Schema.Types.ObjectId,
        ref: 'Item'
    }],
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }]
})

module.exports = mongoose.model('Home', HomeSchema);