const { extend } = require("lodash")
const { Product } = require("../models/product.model");

exports.getAllProducts = async (req, res) => {
    try {
      const products = await Product.find({});
      res.json({ success: true, data: products })
    } catch (err) {
      res.status(500).json({ success: false, message: "unable to get products", errorMessage: err.message })
    }
  }

  exports.createNewProduct = async (req, res) => {
    try {
      const product = req.body;
      const NewProduct = new Product(product);
      const savedProduct = await NewProduct.save();
      res.json({ success: true, data: savedProduct })
    } catch (err) {
      res.status(500).json({ success: false, message: "unable to add products", errorMessage: err.message })
    }
  }

  exports.getProductDetails = (req, res) => {
    let { product } = req;
    product.__v = undefined;
    res.json({ success: true, data: product })
  }

  exports.updateProductDetails = async (req, res) => {
    const productUpdates = req.body;
    let {product} = req;

    product = extend(product, productUpdates);
    product = await product.save();
    res.json({ success: true, data: product});
  }

  exports.deleteProduct =  async (req, res) => { 
    let {product} = req;
    await product.remove();
    res.json({ success: true, data: product }) 
  }

  