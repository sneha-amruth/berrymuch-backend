const { Product } = require("../models/product.model");
const { User } = require("../models/user.model");
const { Cart } = require("../models/cart.model");
const { Wishlist } = require("../models/wishlist.model");


exports.getProductById = async (req, res, next, id) => {
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(400).json({ success: false, message: "product not found"})
    } 
    req.product = product;
    next()
  } catch(err) {
    res.status(400).json({ success: false, message: "could not retrieve product ", error: err.message})
  }
}

exports.getUserById = async (req, res, next, id) => {
  try {
    const user = await User.findById(id);
    if(!user) {
      return res.status(400).json({success: false, message: "user does not exist"})
    }
    req.user = user;
    next()
  } catch(err) {
    res.status(400).json({success: false, message: "could not retrieve user", error: err.message});
  }
}

exports.getUserCart = async (req, res, next, userId) => {
  try {
    const cart = await Cart.findById(userId).populate('cartItems.product', 'name brand price image')
    req.cart = cart;
    next()
  }catch(err){
    res.status(400).json({success: false, message: "could not retrieve cart", error: err.message});
  }
}

exports.getUserWishlist = async (req, res, next, userId) => {
  try {
    const wishlist = await Wishlist.findById(userId).populate('wishlistItems.product', 'name brand price image')
    req.wishlist = wishlist;
    next()
  }catch(err){
    res.status(400).json({success: false, message: "could not retrieve wishlist", error: err.message});
  }
}


