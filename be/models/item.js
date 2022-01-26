const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');
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
    },
    image: {
        url: String,
        filename: String
    }
})
ItemSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Item', ItemSchema);