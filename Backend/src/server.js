import { applyRouts } from "./middleware/route.js";
import { routs } from "./service/index.route.js";
import { config } from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
// import cookieParser from "cookie-parser";
import { verifyJwt } from "./middleware/JWT.js";

config();
const app = express();
const PORT = process.env.PORT || 5000;
// app.use(cookieParser());
// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(verifyJwt);
const url = process.env.URL;

try {
  // MongoDB Connection
  await mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("Connected to MongoDB");
} catch (error) {
  console.error("MongoDB connection error:", error);
}

//Define a schema for the cart model

// Define a schema for the user model
const { Schema, model } = mongoose;
const userSchema = new Schema({
  username: String,
  email: String,
  password: String,
});

// Create a model based on the schema
export const User = model("User", userSchema);

// Define a schema for the product model
const productSchema = new Schema({
  id: Number,
  title: String,
  price: Number,
  description: String,
  category: String,
  image: String,
  rating: {
    rate: Number,
    count: Number,
  },
});

// Create a model based on the schema
export const Product = model("Product", productSchema);

//create schema for the cart model
const cartSchema = new Schema({
  id: Number,
  userId: String,
  productId: Number,
  quantity: Number,
});

//create a model based on the schema
export const Cart = model("Cart", cartSchema);

const addressSchema = new mongoose.Schema({
  name: String,
  phoneNumber: String,
  pincode: String,
  locality: String,
  address: String,
  city: String,
  country: String,
  userId: mongoose.Schema.Types.ObjectId,
});

// Create a model based on the schema
const Address = mongoose.model("Address", addressSchema);

applyRouts(routs, app);

app.post("/api/products", async (req, res) => {
  try {
    console.log(req.body);
    const { title, price, description, category, image, rating } = req.body;

    // Create a new product instance
    const newProduct = new Product({
      id: Math.floor(Math.random() * 1000),
      title,
      price,
      description,
      category,
      image,
      rating,
    });

    // Save the new product to the database
    await newProduct.save();

    // Respond with a success message
    res
      .status(201)
      .json({ message: "Product added successfully", product: newProduct });
  } catch (error) {
    // Handle errors
    console.error("Error adding product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.delete("/api/products/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;
    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});
app.get("/api/products/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findOne({ id: productId });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.status(200).json(product);
  } catch (error) {
    console.error("Error fetching the data:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.delete("/api/users/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    // Find the user by ID and delete it
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.put("/api/users/:userId/edit-email", async (req, res) => {
  try {
    const { userId } = req.params;
    const { email } = req.body;

    // Find the user by ID and update the email
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { email },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error editing user email:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});
app.post("/api/cart/add", async (req, res) => {
  try {
    console.log(req.userId);
    const { productId, quantity } = req.body;

    // Check if the product already exists in the cart
    const existingCartItem = await Cart.findOne({
      productId,
      userId: req.userId,
    });

    if (existingCartItem) {
      // If the product exists, update the quantity
      existingCartItem.quantity += quantity;
      await existingCartItem.save();

      // Respond with a success message and the updated cart item
      return res.status(200).json({
        message: "Quantity updated successfully",
        cartItem: existingCartItem,
      });
    } else {
      // If the product doesn't exist, create a new cart item instance
      const newCartItem = new Cart({
        userId: req.userId,
        productId,
        quantity,
      });

      // Save the new cart item to the database
      await newCartItem.save();

      // Respond with a success message and the new cart item
      return res.status(201).json({
        message: "Item added to cart successfully",
        cartItem: newCartItem,
      });
    }
  } catch (error) {
    // Handle errors
    console.error("Error adding item to cart:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/api/cart", async (req, res) => {
  try {
    const userId = req.userId;
    // console.log(userId);
    // Fetch all cart items from the database
    const cartItems = await Cart.find({ userId });

    // Respond with cart items
    res.status(200).json(cartItems);
  } catch (error) {
    // Handle errors
    console.error("Error fetching cart details:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
app.delete("/api/cart/remove/:productId", async (req, res) => {
  try {
    const { productId } = req.params;

    // Find the cart item by productId
    const cartItem = await Cart.findOne({ productId });

    if (!cartItem) {
      // If the cart item doesn't exist, return a 404 status code
      return res.status(404).json({ message: "Cart item not found" });
    }

    // Remove the cart item from the database
    await cartItem.deleteOne();

    // Respond with a success message
    return res.status(200).json({ message: "Cart item removed successfully" });
  } catch (error) {
    // Handle errors
    console.error("Error removing item from cart:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Route to handle POST requests for storing address details
app.post("/api/addresses", async (req, res) => {
  try {
    const {
      name,
      phoneNumber,
      pincode,
      locality,
      address,
      city,
      country,
      userId,
    } = req.body;

    // Create a new address instance
    const newAddress = new Address({
      name,
      phoneNumber,
      pincode,
      locality,
      address,
      city,
      country,
      userId: mongoose.Types.ObjectId(userId), // Convert user ID to ObjectId
    });

    // Save the new address to the database
    await newAddress.save();

    // Respond with a success message
    res
      .status(201)
      .json({ message: "Address added successfully", address: newAddress });
  } catch (error) {
    console.error("Error adding address:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
