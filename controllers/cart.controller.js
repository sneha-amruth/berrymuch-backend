const { extend } = require("lodash");
const { Cart } = require("../models/cart.model");
const { Product } = require("../models/product.model");


exports.getCartProducts = async (req, res) => {
  try {
     const { cart } = req;
     if(cart){
       res.json({ success: true, data: cart.cartItems })
     }
     else {
       res.json({ success: true, data: [] })
     }
  } catch(err){
    res.status(500).json({ success: false, message: "unable to add get cart items", errorMessage: err.message })
  }
}

exports.addProductToCart = async (req, res) => {
  try {
    const { cart, user, product } = req;
    if(cart){
      if(cart.cartItems.id(product._id)){
        throw Error("Product already in cart");
      }
      let updatedCart = { ...cart, cartItems: cart.cartItems.concat({_id: product._id, product: product._id, quantity:1})}
      updatedCart = extend( cart, updatedCart )
      const savedCart = await updatedCart.save();
      res.json({ success: true, data: savedCart })
    } 
    else {
      let NewCart = new Cart( { _id: user._id, cartItems: [{_id: product._id, product: product._id, quantity:1} ] } );
      const savedCart = await NewCart.save();
      res.json({ success: true, data: savedCart })
    }
     
  }catch(err){
    res.status(500).json({ success: false, message: "unable to add product to the cart", errorMessage: err.message })
  }
}

exports.updateProductQuantity = async (req, res) => {
   try {
     const { cart, product } = req;
     const { quantity } = req.body;
     if(cart){
       const products = await cart.cartItems.id(product._id)
       if(products){
        const productsUpdate = extend(products, { quantity:quantity } )
        cart.cartItems = extend(cart.cartItems, { productsUpdate })
        await cart.save();
        res.status(200).json({ success: true, message:"product quantity added"})
      }else {
         throw Error("This product not in cart");
       }
     } else {
          throw Error("Cart does not exist");
     }
   } catch(err){
     res.status(500).json({ success: false, message: "unable to update product quantity", errorMessage: err.message })
   }
}

exports.removeProductFormCart = async(req, res) => {
  try {
    const { cart, product } = req;
    if(cart) {
      await cart.cartItems.id(product._id).remove();
      await cart.save();
      res.status(200).json({success:true, message:"product removed from cart"})
    }
  } catch(err){
    res.status(500).json({ success: false, message: "unable to remove product", errorMessage: err.message })
  }
}

