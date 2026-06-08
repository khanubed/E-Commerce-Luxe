import API from "../../api/axios";


// Fetch all products with query filters
export const getProducts = async (params = {}) => {
  const response = await API.get("/api/product", { params });
  return response.data; 
};

// Fetch a single product details by slug
export const getProductBySlug = async (slug) => {
  const response = await API.get(`/api/product/${slug}`);
  return response.data;
};

// Toggle item in wishlist
export const toggleWishlist = async (productId) => {
  const response = await API.patch(`/api/product/${productId}/wishlist`);
  return response.data; // Expecting backend to return updated user/wishlist data
};

//TOGGLE ITEM IN CART
export const toggleCart = async (productId) => {
  const response = await API.patch(`/api/product/${productId}/cart`);
  return response.data; 
};

export const getProductsListByIds = async (idsArray) => {
  const response = await API.post("/api/product/list-by-ids", { ids: idsArray });
  return response.data; // Returns { success: true, products: [...] }
};

export const updateCartQuantityApi = async (productId, quantity) => {
  const response = await API.put("/api/product/cart/quantity", { productId, quantity });
  return response.data;
};