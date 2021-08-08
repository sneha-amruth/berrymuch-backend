const express = require('express');
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());
app.use(cors());

const productRoutes = require("./routes/products.router");
app.use("/api/products", productRoutes);

const userRoutes = require("./routes/user.router");
app.use("/api/user", userRoutes);

const cartRoutes = require("./routes/cart.router");
app.use("/api/cart", cartRoutes);

const wishlistRoutes = require("./routes/wishlist.router");
app.use("/api/wishlist", wishlistRoutes);

const { initializeDbConnection } = require("./db/db.connect")
const PORT = 3000;
initializeDbConnection();

app.get('/', (req, res) => {
  res.json({hello: "world"})
});

app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found on server"})
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({success: false, message: "oops data not found in the server", errMessage: err.message})
})

app.listen(PORT, () => {
  console.log('server has started and is running at port '+ PORT);
});