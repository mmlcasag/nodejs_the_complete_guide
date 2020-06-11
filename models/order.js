const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    user: {
        _id: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: false
        }
    },
    products: [{
        product: { 
            type: Object,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        }
    }]
});

module.exports = mongoose.model('Order', orderSchema);