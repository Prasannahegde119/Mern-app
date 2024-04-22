const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios"); // Import axios library

const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB Connection
mongoose
  .connect(
    "mongodb+srv://hegdeprasanna119:74vdlRHIkYtYQmNu@fashiondesign.gnmkwqs.mongodb.net/",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

// Define a schema for the user model
const { Schema, model } = mongoose;
const userSchema = new Schema({
  username: String,
  email: String,
  password: String,
});

// Create a model based on the schema
const User = model("User", userSchema);

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
const Product = model("Product", productSchema);

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.post("/api/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    // Check if the username or email already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Username or email already exists" });
    }
    // Create a new user
    const newUser = new User({ username, email, password });
    await newUser.save();
    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    // Check if the user exists with the provided email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Check if the password is correct
    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid password" });
    }
    // Login successful
    return res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error("Error logging in:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Fetch data from the FakeStore API and insert into MongoDB on server startup
const fetchData = async () => {
  try {
    const response = await axios.get("https://fakestoreapi.com/products");
    const products = response.data;
    // Insert products into MongoDB collection
    await Product.insertMany(products);
    console.log("Products inserted successfully");
  } catch (error) {
    console.error("Error fetching or inserting products:", error);
  }
};

// Call fetchData function to fetch and insert products
fetchData();

app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find();
    return res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Add a new route for manually inserting a new product
app.post("/api/add-product", async (req, res) => {
  try {
    const {
      id,
      title,
      price,
      description,
      category,
      image,
      rating,
      ratingCount,
    } = req.body;

    // Create a new product document
    const newProduct = new Product({
      id,
      title,
      price,
      description,
      category,
      image,
      rating: { rate: rating, count: ratingCount }, // Embed rating object
    });

    // Save the new product to the database
    await newProduct.save();

    return res.status(201).json({ message: "Product added successfully" });
  } catch (error) {
    console.error("Error adding product:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find();
    return res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
