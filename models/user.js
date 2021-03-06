const mongoose = require('mongoose');

const Order = require('./order');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: false
    },
    cart: {
        items: [{ 
            productId: { 
                type: Schema.Types.ObjectId,
                ref: 'Product',
                required: true 
            },
            quantity: {
                type: Number, 
                required: true
            }
        }]
    },
    resetPasswordToken: String,
    resetPasswordExpiration: Date
});

userSchema.methods.addToCart = function(product) {
    const updatedCartItems = [...this.cart.items];

    const cartProductIndex = this.cart.items.findIndex(prod => prod.productId.toString() === product._id.toString());
    
    if (cartProductIndex >= 0) {
        updatedCartItems[cartProductIndex].quantity = this.cart.items[cartProductIndex].quantity + 1;;
    } else {
        updatedCartItems.push({ productId: product._id, quantity: 1 });
    }

    this.cart = { items: updatedCartItems };

    return this.save();
}

userSchema.methods.removeFromCart = function(product) {
    const updatedCartItems = this.cart.items.filter(prod => prod.productId.toString() !== product._id.toString());

    this.cart.items = updatedCartItems;

    return this.save();
}

userSchema.methods.clearCart = function() {
    this.cart.items = [];
    
    return this.save();
}

module.exports = mongoose.model('User', userSchema);