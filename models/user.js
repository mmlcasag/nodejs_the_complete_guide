const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    cart: {
        // this is how we declare an array
        items: [{ 
            productId: { 
                type: Schema.Types.ObjectId, // this how we make a reference to another schema
                ref: 'Product',
                required: true 
            },
            quantity: {
                type: Number, 
                required: true
            }
        }]
    }
});

module.exports = mongoose.model('User', userSchema);