const { extend } = require("lodash");
const { Wishlist } = require("../models/wishlist.model");
const { Product } = require("../models/product.model");


exports.getWishlistProducts = async (req, res) => {
  try {
     const { wishlist } = req;
     if(wishlist){
       res.json({ success: true, data: wishlist.wishlistItems })
     }
     else {
       res.json({ success: true, data: [] })
     }
  } catch(err){
    res.status(500).json({ success: false, message: "unable to add get wishlist items", errorMessage: err.message })
  }
}

exports.addProductToWishlist = async (req, res) => {
  try {
    const { wishlist, user, product } = req;
    if(wishlist){
      if(wishlist.wishlistItems.id(product._id)){
        throw Error("Product already in wishlist");
      }
      let updatedWishlist = { ...wishlist, wishlistItems: wishlist.wishlistItems.concat({_id: product._id, product: product._id, quantity:1})}
      updatedWishlist = extend( wishlist, updatedWishlist)
      const savedWishlist = await updatedWishlist.save();
      res.json({ success: true, data: savedWishlist })
    } 
    else {
      let NewWishlist = new Wishlist( { _id: user._id, wishlistItems: [{_id: product._id, product: product._id} ] } );
      const savedWishlist = await NewWishlist.save();
      res.json({ success: true, data: savedWishlist })
    }
     
  }catch(err){
    res.status(500).json({ success: false, message: "unable to add product to wishlist", errorMessage: err.message })
  }
}

exports.removeProductFormWishlist = async(req, res) => {
  try {
    const { wishlist, product } = req;
    if(wishlist) {
      await wishlist.wishlistItems.id(product._id).remove();
      await wishlist.save();
      res.status(200).json({success:true, message:"product removed from wishlist"})
    }
  } catch(err){
    res.status(500).json({ success: false, message: "unable to remove product", errorMessage: err.message })
  }
}

