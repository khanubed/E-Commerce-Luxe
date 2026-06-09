import User from "../models/userSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { generateAccessToken, generateRefreshToken } from "../util/util.js";
import { registerSchema, loginSchema } from "../validators/authValidators.js";

export const login = async (req, res) => {
  try {
    const { error, value } = loginSchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    const { email, password } = value;

    const user = await User.findOne({ email }).select("+password");

    console.log("user", user)

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    user.refreshToken = refreshToken;
    await user.save();

    const userData = {
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      cart: user.cart || [],
      wishlist: user.wishlist || [],
      addresses: user.addresses || [],
      isVerified: user.isVerified,
      isAdmin: user.isAdmin
    };
    console.log("user",user)
    console.log("User Data", userData);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      accessToken,
      user: userData,
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong while logging in",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

export const register = async (req, res) => {
  try {
    const { error, value } = registerSchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    const { name, email, password, phone } = value;

    const existingUserWithMail = await User.findOne({ email });
    console.log(existingUserWithMail)
    if (existingUserWithMail) {
      return res.status(409).json({
        success: false,
        message: "An account with this email already exists",
      });
    }

    const existingUserWithPhone = await User.findOne({ phone });

    if (existingUserWithPhone) {
      return res.status(409).json({
        success: false,
        message: "An account with this phone already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
    });

    const accessToken = generateAccessToken(newUser._id);
    const refreshToken = generateRefreshToken(newUser._id);

    newUser.refreshToken = refreshToken;
    await newUser.save();

    const userData = {
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone,
      cart: newUser.cart || [],
      wishlist: newUser.wishlist || [],
      addresses: newUser.addresses || [],
      isVerified: newUser.isVerified,
    };

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      success: true,
      message: "Account created successfully",
      accessToken,
      user: userData,
    });
  } catch (error) {
    console.error("REGISTER ERROR:", error);

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Email already exists",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Something went wrong while creating the account",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

export const refreshAccessToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    // console.log("refresh token in refresh access token", refreshToken)

    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: "Refresh token missing",
      });
    }

    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    // console.log("refresh  decoded", decoded)

    const user = await User.findById(decoded.userId);

    // console.log("refresh  user", user)

    if (!user || user.refreshToken !== refreshToken) {
      return res.status(401).json({
        success: false,
        message: "Invalid refresh token",
      });
    }

    const accessToken = generateAccessToken(user._id);

    return res.status(200).json({
      success: true,
      accessToken,
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid refresh token",
    });
  }
};

export const logout = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (refreshToken) {
      const user = await User.findOne({ refreshToken });

      if (user) {
        user.refreshToken = null;
        await user.save();
      }
    }

    res.clearCookie("refreshToken");

    return res.status(200).json({
      success: true,
      message: "Logged out",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
    });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate("wishlist")
      .select("-password -refreshToken");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("GET ME ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch user profile",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

export const addUserAddress = async (req, res) => {
  try {
    // 1. UPDATE THIS LINE: Destructure the updated keys coming from the frontend
    const { fullName, street, city, state, postalCode, country, type } =
      req.body;
    const userId = req.user._id;

    // 2. UPDATE THIS LINE: Ensure validation checks match the updated properties
    if (!fullName || !street || !city || !state || !postalCode || !country) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // 3. UPDATE THIS LINE: Push the fully compliant dataset parameters into MongoDB
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $push: {
          addresses: {
            fullName,
            street,
            city,
            state,
            postalCode,
            country,
            type: type || "Home",
          },
        },
      },
      { returnDocument: "after" },
    ).select("-password");

    return res.status(200).json({
      success: true,
      message: "Address saved successfully",
      addresses: updatedUser.addresses,
    });
  } catch (error) {
    console.error("ADD ADDRESS ERROR:", error);
    return res
      .status(500)
      .json({ success: false, message: "Server error saving destination" });
  }
};

export const deleteUserAddress = async (req, res) => {
  try {
    const { addressId } = req.params;
    const userId = req.user._id;

    if (!addressId) {
      return res.status(400).json({
        success: false,
        message: "Address ID is required",
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $pull: {
          addresses: { _id: addressId },
        },
      },
      { returnDocument: "after" }, 
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Address deleted successfully",
      addresses: updatedUser.addresses, 
    });
  } catch (error) {
    console.error("DELETE ADDRESS ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Server error deleting address",
    });
  }
};
