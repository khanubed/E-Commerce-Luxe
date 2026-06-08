import mongoose from "mongoose";
import axios from "axios";
import { config } from "dotenv";
import Product from "../models/productSchema.js";
import slugify from 'slugify'

config();

await mongoose.connect(process.env.MONGODB_URI);

export const seedProducts = async () => {
  try {
    const { data } = await axios.get(
      "https://dummyjson.com/products?limit=200",
    );

    const products = data.products.map((item) => ({
      title: item.title,
      slug: `${slugify(item.title, {
        lower: true,
        strict: true,
      })}-${Math.random().toString(36).substring(2, 6)}`,

      description: item.description,
      brand: item.brand || "Unknown",
      category: item.category,
      price: item.price,
      discountPercentage: item.discountPercentage,
      stock: item.stock,
      sku: item.sku,
      weight: item.weight,
      dimensions: item.dimensions,
      warrantyInformation: item.warrantyInformation,
      shippingInformation: item.shippingInformation,
      returnPolicy: item.returnPolicy,
      thumbnail: item.thumbnail,
      images: item.images,
      rating: item.rating,
      reviews: item.reviews,

      availabilityStatus:
        item.stock <= 0
          ? "Out of Stock"
          : item.stock < 10
            ? "Low Stock"
            : "In Stock",

      status: "published",

      createdAt: new Date(item.meta.createdAt),
      updatedAt: new Date(item.meta.updatedAt),
    }));

    await Product.insertMany(products);

    console.log(`${products.length} products inserted`);
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
