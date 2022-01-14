const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Item = require('../models/item');

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

PositionSchema.post('findOneAndDelete', async data => {
    if(data){
        await Item.deleteMany({
            _id: {
                $in: data.items
            }
        })
    }
})
module.exports = mongoose.model('Position', PositionSchema);