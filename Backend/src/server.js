import { applyRouts } from "./middleware/route.js";
import { routs } from "./service/index.route.js";
import { config } from "dotenv";
import express from "express";
import mongoose from "mongoose";
import parser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";

config();
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cookieParser());
app.use(parser());

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

// Middleware
app.use(cors());

applyRouts(routs, app);

// Fetch data from the FakeStore API and insert into MongoDB on server startup
// const fetchData = async () => {
//   try {
//     const response = await axios.get("https://fakestoreapi.com/products");
//     const products = response.data;
//     // Insert products into MongoDB collection
//     await Product.insertMany(products);
//     console.log("Products inserted successfully");
//   } catch (error) {
//     console.error("Error fetching or inserting products:", error);
//   }
// };

// Call fetchData function to fetch and insert products
// fetchData();

// app.get("/api/products", async (req, res) => {
//   try {
//     const products = await Product.find();
//     return res.status(200).json(products);
//   } catch (error) {
//     console.error("Error fetching products:", error);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// });

// app.get("/api/users", async (req, res) => {
//   try {
//     const users = await User.find();
//     return res.status(200).json(users);
//   } catch (error) {
//     console.error("Error fetching users:", error);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// });

// app.get("/api/products", async (req, res) => {
//   try {
//     const products = await Product.find();
//     return res.status(200).json(products);
//   } catch (error) {
//     console.error("Error fetching products:", error);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// });

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

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
