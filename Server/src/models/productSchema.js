import mongoose from "mongoose";
import slugify from "slugify";

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, unique: true, lowercase: true },
    description: { type: String, required: true },
    brand: String,
    category: { type: String, required: true, index: true },
    isDealOfTheDay: { type: Boolean, default: false },
    // Pricing & Stock
    price: { type: Number, required: true },
    discountPercentage: { type: Number, default: 0 },
    stock: { type: Number, required: true },
    sku: { type: String, required: true, unique: true },

    // Physical & Logistics
    weight: Number,
    dimensions: {
      width: Number,
      height: Number,
      depth: Number,
    },
    warrantyInformation: String,
    shippingInformation: String,
    returnPolicy: String,

    // Assets
    thumbnail: String,
    images: [String],
    video: String,

    // Status & Social
    availabilityStatus: {
      type: String,
      enum: ["In Stock", "Low Stock", "Out of Stock"],
      default: "In Stock",
    },
    status: {
      type: String,
      enum: ["inactive", "published"],
      default: "published",
    },
    rating: { type: Number, default: 0 },
    reviews: [
      {
        rating: Number,
        comment: String,
        reviewerName: String,
        reviewerEmail: String,
        date: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true },
);

// --- MIDDLEWARE: SLUG & AVAILABILITY ---
productSchema.pre("save", function () {
  if (this.stock <= 0) this.availabilityStatus = "Out of Stock";
  else if (this.stock < 10) this.availabilityStatus = "Low Stock";
  else this.availabilityStatus = "In Stock";

  if (this.isModified("title")) {
    const base = slugify(this.title, {
      lower: true,
      strict: true,
    });

    const shortId = Math.random().toString(36).substring(2, 6);
    this.slug = `${base}-${shortId}`;
  }
});
const Product = mongoose.model("Product", productSchema);

export default Product;
