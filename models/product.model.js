const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: "Please enter product name",
    trim: true
  }, 
  brand: {
    type: String,
    required: "Please enter a brand name",
    trim: true
  },
  image : {
    type: String,
    trim: true,
    required: "Image is required"
  },
  price: {
    type: Number,
    required: "Please enter product price"
  },
  category: {
    type: String,
    required: "Please enter the category the product belongs to",
    trim: true
  },
  description: {
    type: String,
    minLength: [100, "Description must be 300 characters or more"]
  },
  rating: {
    type: Number,
  },
  inStock: {
    type: Boolean
  },
  fastDelivery: {
    type: Boolean
  }
  }, { timestamps: true });


const Product = mongoose.model("Product", ProductSchema);

module.exports = {Product}