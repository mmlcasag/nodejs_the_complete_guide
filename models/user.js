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

module.exports = mongoose.model('User', userSchema);