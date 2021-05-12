const mongoose = require("mongoose");

const WishlistItemsSchema = new mongoose.Schema({
  product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      unique: "Product is already wishlisted",
      required: "Product is required"
    },
});

const WishlistSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  wishlistItems: [WishlistItemsSchema]
  }, { timestamps: true });


const Wishlist = mongoose.model("Wishlist", WishlistSchema);

module.exports = {Wishlist}