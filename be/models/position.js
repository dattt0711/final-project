const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PositionSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    home: {
        type: Schema.Types.ObjectId,
        ref: 'Home'
    },
    items: [{
        type: Schema.Types.ObjectId,
        ref: 'Item'
    }],
})

module.exports = mongoose.model('Position', BookSchema);