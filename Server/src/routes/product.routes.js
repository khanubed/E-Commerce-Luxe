import {
  createProduct,
  getDealsOfTheDay,
  getProductById,
  getProductBySlug,
  getProducts,
  getProductsListByIds,
  toggleDealStatus,
  toggleProductInCart,
  toggleProductInWishlist,
  toggleProductStatus,
  updateCartQuantity,
  updateProduct,
} from "../controllers/product.controller.js";
import { protect, protectAdmin } from "../middleware/auth.middleware.js";
import upload from "../middleware/multerConfig.js";
import validateRequest from "../middleware/validateRequest.js";
import { formatProductData } from "../util/productUtil.js";
import { productValidationSchema } from "../validators/productValidator.js";
import express from "express";

const productRouter = express.Router();

productRouter.post(
  "/add",
  protect,
  protectAdmin,
  upload.fields([
    { name: "images", maxCount: 8 },
    { name: "video", maxCount: 1 },
  ]),
  formatProductData,

  createProduct,
);

productRouter.put(
  "/:id",
  upload.fields([
    { name: "images", maxCount: 10 },
    { name: "video", maxCount: 1 },
  ]),
  protect,
  protectAdmin,
  formatProductData,
  validateRequest(productValidationSchema),
  updateProduct,
);

productRouter.patch(
  "/toggle-status/:id",
  protect,
  protectAdmin,
  toggleProductStatus,
);
productRouter.get("/deals-of-the-day", getDealsOfTheDay);
productRouter.get("/", getProducts);
productRouter.get("/:slug", getProductBySlug);
productRouter.get("/edit/:id", getProductById);
productRouter.patch("/:productId/wishlist", protect, toggleProductInWishlist);
productRouter.patch("/:productId/cart", protect, toggleProductInCart);
productRouter.post("/list-by-ids", getProductsListByIds);
productRouter.put("/cart/quantity", protect, updateCartQuantity);

productRouter.patch(
  "/toggle-deal/:id",
  protect,
  protectAdmin,
  toggleDealStatus,
);

export default productRouter;
