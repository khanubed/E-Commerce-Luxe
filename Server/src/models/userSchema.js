import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    // --- BASIC IDENTIFICATION ---
    name: {
      type: String,
      required: [true, "Please provide your name"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please provide your email"],
      unique: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required for delivery updates"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 8,
      select: false,
    },

    // --- SHOPPING STATE
    cart: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        quantity: {
          type: Number,
          default: 1,
          min: [1, "Quantity cannot be less than 1"],
        },
      },
    ],
    isAdmin: {
      type: Boolean,
      default: false,
    },

    wishlist: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],

    // --- LOGISTICS (Array of objects for multiple locations) ---
    addresses: [
      {
        fullName: { type: String, required: true },
        street: { type: String, required: true }, 
        city: { type: String, required: true },
        state: { type: String, required: true }, 
        postalCode: { type: String, required: true },
        country: { type: String, required: true }, 
        type: { type: String, default: "Home" },
      },
    ],

    // --- HISTORY & TRANSACTIONS ---
    orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
      },
    ],

    // --- PAYMENT PROFILES (Storing tokens/identifiers, NOT raw card data) ---
    paymentMethods: [
      {
        provider: { type: String, enum: ["Stripe", "PayPal", "Razorpay"] },
        paymentToken: String, // From the payment gateway
        lastFour: String, // For UI display: "Visa ending in 4242"
        expiryDate: String,
      },
    ],

    // --- METADATA (For Analytics & Security) ---
    isVerified: {
      type: Boolean,
      default: false,
    },
    lastLogin: Date,
    refreshToken: {
      type: String,
      default: null,
    }, // For maintaining persistent sessions
  },
  {
    timestamps: true, // Automatically creates 'createdAt' and 'updatedAt'
  },
);

const User = mongoose.model("User", userSchema);

export default User;
