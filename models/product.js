const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    userId: {
        type: Schema.Types.ObjectId, // this could be any ObjectId of any object
        ref: 'User', // here we specify which schema this ObjectId relates to
        required: false
    }
});

module.exports = mongoose.model('Product', productSchema);