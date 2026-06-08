import API from "../api/axios";

export const saveAddressApi = async (addressData) => {
  const response = await API.post("/api/auth/add-address", addressData);
  return response.data;
};

export const getUserOrdersApi = async () => {
  const response = await API.get("/api/orders/my-orders");
  return response.data;
};

export const cancelOrderApi = async (orderId, payload) => {
  const response = await API.patch(`/api/orders/${orderId}/cancel`, payload);
  return response.data
};

export const deleteUserAddressApi = async (addressId) => {
  const response = await API.delete(`/api/auth/delete-address/${addressId}`);
  return response.data;
};

export const createOrderApi = async (orderPayload) => {
  const response = await API.post("/api/orders/checkout", orderPayload);
  return response.data;
};


export const verifyPaymentApi = async (verificationPayload) => {
  const response = await API.post(`/api/orders/verify`, verificationPayload);
  return response.data;
};
