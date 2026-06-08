import { createSlice } from "@reduxjs/toolkit";

const storedCartItems = localStorage.getItem("cartItems");
const initialItems = storedCartItems ? JSON.parse(storedCartItems) : [];

const calculateTotals = (items) => {
  const amount = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const count = items.reduce((acc, item) => acc + item.quantity, 0);
  return { amount, count };
};

const { amount: initialAmount, count: initialCount } =
  calculateTotals(initialItems);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: initialItems, 
    totalAmount: initialAmount, 
    totalItems: initialCount,
  },
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id,
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }

      const { amount, count } = calculateTotals(state.items);
      state.totalAmount = amount;
      state.totalItems = count;
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },

    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      const { amount, count } = calculateTotals(state.items);
      state.totalAmount = amount;
      state.totalItems = count;
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },

    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((item) => item.id === id);
      if (item) {
        item.quantity = Math.max(1, quantity);
      }
      const { amount, count } = calculateTotals(state.items);
      state.totalAmount = amount;
      state.totalItems = count;
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },

    clearCart: (state) => {
      state.items = [];
      state.totalAmount = 0;
      state.totalItems = 0;
      localStorage.removeItem("cartItems");
      console.log("cleared")
    },
    setCart: (state, action) => {
      state.items = action.payload || [];
      const { amount, count } = calculateTotals(state.items);
      state.totalAmount = amount;
      state.totalItems = count;
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart, setCart } =
  cartSlice.actions;
export const cartReducer = cartSlice.reducer;
