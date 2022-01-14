const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    position: {
        type: Schema.Types.ObjectId,
        ref: 'Position'
    },
    task: {
        type: String,
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
    },
    expires: {
        type: String,
    },
    home: {
        type: Schema.Types.ObjectId,
        ref: 'Home'
    }
})
module.exports = mongoose.model('Item', ItemSchema);