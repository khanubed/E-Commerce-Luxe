import { createSlice } from '@reduxjs/toolkit';

// 1. Get items from localStorage first
const savedItems = JSON.parse(localStorage.getItem('cartItems')) || [];

// 2. Define the helper (keeping it outside for cleanliness)
const calculateTotals = (items) => {
  const amount = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const count = items.reduce((acc, item) => acc + item.quantity, 0);
  return { amount, count };
};

// 3. Calculate initial values immediately
const initialTotals = calculateTotals(savedItems);

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: savedItems,
    totalAmount: initialTotals.amount, // No longer 0 on load!
    totalItems: initialTotals.count,   // No longer 0 on load!
  },
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      
      const { amount, count } = calculateTotals(state.items);
      state.totalAmount = amount;
      state.totalItems = count;
      localStorage.setItem('cartItems', JSON.stringify(state.items));
    },
    
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      const { amount, count } = calculateTotals(state.items);
      state.totalAmount = amount;
      state.totalItems = count;
      localStorage.setItem('cartItems', JSON.stringify(state.items));
    },
    
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find(item => item.id === id);
      if (item) {
        item.quantity = Math.max(1, quantity);
      }
      const { amount, count } = calculateTotals(state.items);
      state.totalAmount = amount;
      state.totalItems = count;
      localStorage.setItem('cartItems', JSON.stringify(state.items));
    },
    
    clearCart: (state) => {
      state.items = [];
      state.totalAmount = 0;
      state.totalItems = 0;
      localStorage.removeItem('cartItems');
    }
  }
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;