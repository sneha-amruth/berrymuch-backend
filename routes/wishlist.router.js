const express = require("express");
const router = express.Router();

const { getProductById, getUserById, getUserWishlist } = require("../controllers/params");
const { getWishlistProducts, addProductToWishlist, removeProductFormWishlist } = require("../controllers/wishlist.controller");

router.param("productId", getProductById);
router.param("userId", getUserById);
router.param("userId", getUserWishlist);

router.get("/:userId", getWishlistProducts);
router.post("/:userId/:productId", addProductToWishlist)
router.delete("/:userId/:productId", getProductById, removeProductFormWishlist)


module.exports = router;

