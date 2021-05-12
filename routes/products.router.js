const express = require("express");
const router = express.Router();

const { getProductById } = require("../controllers/params");
const { getAllProducts, createNewProduct, getProductDetails, updateProductDetails, deleteProduct } = require("../controllers/product.controller");

router.param("productId", getProductById);
router.get("/", getAllProducts);
router.post("/", createNewProduct);
router.get("/:productId", getProductDetails);
router.post("/:productId", updateProductDetails);
router.delete("/:productId", deleteProduct);

module.exports = router;