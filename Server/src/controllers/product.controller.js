import { productValidationSchema } from "../validators/productValidator.js";
import Product from "../models/productSchema.js";
import User from "../models/userSchema.js";

export const createProduct = async (req, res) => {
  try {
    // console.log("Create controller reached");
    // 1. Get Cloudinary URLs provided by Multer
    const imageUrls = req.files?.images?.map((file) => file.path) || [];
    const videoUrl = req.files?.video?.[0]?.path || null;

    // 2. Determine thumbnail based on selection
    const thumbIndex = req.body.thumbnailIndex || 0;
    const thumbnail =
      imageUrls[thumbIndex] || (imageUrls.length > 0 ? imageUrls[0] : null);

    // 3. Create document (req.body already formatted by middleware)
    const product = new Product({
      ...req.body,
      images: imageUrls,
      thumbnail: thumbnail,
      video: videoUrl,
    });

    await product.save();
    res
      .status(201)
      .json({ success: true, message: "Product published!", data: product });
  } catch (error) {
    console.error("CREATE PRODUCT ERROR:");
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // 1. Find the existing product
    const existingProduct = await Product.findById(id);
    if (!existingProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    // 2. Parse existing images sent back from Frontend
    // React sends: data.append("existingImages", JSON.stringify([...]))
    let finalImages = [];
    if (req.body.existingImages) {
      finalImages = JSON.parse(req.body.existingImages);
    }

    // 3. Add new images uploaded to Cloudinary by Multer
    if (req.files?.images) {
      const newImageUrls = req.files.images.map((file) => file.path);
      finalImages = [...finalImages, ...newImageUrls];
    }

    // 4. Handle Video
    let finalVideo = req.body.existingVideo || existingProduct.video;
    if (req.files?.video) {
      finalVideo = req.files.video[0].path;
    }

    // 5. Determine Thumbnail
    const thumbIndex = parseInt(req.body.thumbnailIndex) || 0;
    const thumbnail = finalImages[thumbIndex] || finalImages[0];

    // 6. Update Database
    const updatedData = {
      ...req.body,
      images: finalImages,
      thumbnail: thumbnail,
      video: finalVideo,
    };

    const product = await Product.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: "Product updated successfully!",
      data: product,
    });
  } catch (error) {
    console.error("UPDATE PRODUCT ERROR:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const toggleProductStatus = async (req, res) => {
  try {
    const { id } = req.params;

    // 1. Find the product
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // 2. Logic for Toggling
    // If you use a String status: 'published' vs 'inactive'
    const newStatus = product.status === "published" ? "inactive" : "published";

    // If you use a Boolean: product.isActive = !product.isActive;

    // 3. Update only the status field
    product.status = newStatus;
    await product.save();

    res.status(200).json({
      success: true,
      message: `Product status changed to ${newStatus}`,
      data: {
        id: product._id,
        status: product.status,
      },
    });
  } catch (error) {
    console.error("TOGGLE STATUS ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const getProducts = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 24,
      search = "",
      category,
      minPrice,
      maxPrice,
      sort = "-createdAt",
    } = req.query;

    const query = {};

    // Search by title or description
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    // Category Filter
    if (category) {
      query.category = category;
    }

    // Price Filter
    if (minPrice || maxPrice) {
      query.price = {};

      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    const skip = (Number(page) - 1) * Number(limit);
    const sortOption = sort || "-createdAt";

    const [products, totalProducts] = await Promise.all([
      Product.find(query).sort(sortOption).skip(skip).limit(Number(limit)),
      Product.countDocuments(query),
    ]);

    res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      count: products.length,
      totalProducts,
      totalPages: Math.ceil(totalProducts / limit),
      currentPage: Number(page),
      products,
    });
  } catch (error) {
    console.error("Get Products Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch products",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

export const getProductBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const product = await Product.findOne({
      slug,
      status: "published",
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product fetched successfully",
      product,
    });
  } catch (error) {
    console.error("GET PRODUCT BY SLUG ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch product",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product fetched successfully",
      product,
    });
  } catch (error) {
    console.error("GET PRODUCT BY ID ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch product",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

export const toggleProductInWishlist = async (req, res) => {
  try {
    const { productId } = req.params;
    console.log(productId);
    const userId = req.user._id;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const product = await Product.findById(productId);
    console.log(product);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // console.log("Here is wishlist beffore" ,user.wishlist)

    const wishlist = user.wishlist || [];

    if (wishlist.includes(productId)) {
      user.wishlist = wishlist.filter((item) => item != productId);
    } else {
      user.wishlist.push(productId);
    }

    // console.log("Here is wishlist after" ,user.wishlist)

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Product toggled successfully",
      wishlist: user.wishlist,
    });
  } catch (error) {
    console.error("TOGGLE PRODUCT IN WISHLIST ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to toggle product in wishlist",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

export const toggleProductInCart = async (req, res) => {
  try {
    const { productId } = req.params;
    console.log(productId);
    const userId = req.user._id;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const product = await Product.findById(productId);
    // console.log(product);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // console.log("Here is wishlist beffore" ,user.wishlist)

    const cart = user.cart || [];

    const existingIndex = cart.findIndex(
      (item) => item.product.toString() === productId,
    );

    if (existingIndex > -1) {
      user.cart.splice(existingIndex, 1);
    } else {
      user.cart.push({ product: productId, quantity: 1 });
    }

    // console.log("Here is wishlist after" ,user.wishlist)

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Product toggled successfully",
      cart: user.cart,
    });
  } catch (error) {
    console.error("TOGGLE PRODUCT IN CART ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to toggle product in cart",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

export const getProductsListByIds = async (req, res) => {
  try {
    const { ids } = req.body; // Expecting an array: ["id1", "id2", "..."]

    // Safety check: if no IDs or an empty array is provided, return empty
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(200).json({
        success: true,
        products: [],
      });
    }

    // Find all products whose _id matches any value inside the ids array
    const products = await Product.find({ _id: { $in: ids } });

    return res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    console.error("GET PRODUCTS BY IDS ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve specified products",
    });
  }
};

export const updateCartQuantity = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const user = await User.findOneAndUpdate(
      { _id: req.user._id, "cart.product": productId },
      { $set: { "cart.$.quantity": quantity } },
      { new: true },
    );

    if (quantity <= 0) {
      const updatedUser = await User.findByIdAndUpdate(
        req.user._id,
        { $pull: { cart: { product: productId } } },
        { returnDocument: "after" },
      );
      return res.status(200).json({ success: true, cart: updatedUser.cart });
    }

    return res.status(200).json({ success: true, cart: user.cart });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const toggleDealStatus = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    // Flip the current boolean assignment
    product.isDealOfTheDay = !product.isDealOfTheDay;
    await product.save();

    return res.status(200).json({
      success: true,
      message: `Product ${product.isDealOfTheDay ? "added to" : "removed from"} Deals of the Day.`,
      data: product,
    });
  } catch (error) {
    console.error("Deal toggle error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const getDealsOfTheDay = async (req, res) => {
  try {
    console.log("Deals of the day hitted");

    const dealProducts = await Product.find({
      isDealOfTheDay: true,
      status: "published",
    });

    return res.status(200).json({
      success: true,
      count: dealProducts.length,
      products: dealProducts,
    });
  } catch (error) {
    console.error("Fetch deals error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
