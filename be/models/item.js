const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true,
    },
    positions: [{
        type: Schema.Types.ObjectId,
        ref: 'Position'
    }],
})
module.exports = mongoose.model('Item', BookSchema);