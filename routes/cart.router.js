const express = require("express");
const router = express.Router();

const { getProductById, getUserById, getUserCart } = require("../controllers/params");
const { getCartProducts, addProductToCart, updateProductQuantity, removeProductFormCart } = require("../controllers/cart.controller");

router.param("productId", getProductById);
router.param("userId", getUserById);
router.param("userId", getUserCart);

router.get("/:userId", getCartProducts);
router.post("/:userId/:productId", addProductToCart)
router.put("/:userId/:productId",getProductById, updateProductQuantity)
router.delete("/:userId/:productId",getProductById, removeProductFormCart)


module.exports = router;

