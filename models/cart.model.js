const mongoose = require("mongoose");

const CartItemsSchema = new mongoose.Schema({
  product: {
       type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        unique: "Product is already in cart",
        required: "Product is required"
    },
    quantity: {
        type: Number,
        default: 1
    }
});

const CartSchema = new mongoose.Schema({
  cartItems: [CartItemsSchema],
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    unique: "There is a cart already associated to this user",
    required: "User ID is required"
  },
  
  }, { timestamps: true });


const Cart = mongoose.model("Cart", CartSchema);

module.exports = {Cart}
