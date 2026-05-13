import axios from 'axios';
import { store } from '../store.jsx';
import { fetchAllProducts } from '../features/products/productsSlice.js';

export const productPageLoader = async ({ params }) => {
  const { productId } = params;

  let state = store.getState();
  let allItems = state.products.items;

  if (allItems.length === 0) {
    await store.dispatch(fetchAllProducts());
    state = store.getState(); 
    allItems = state.products.items;
    console.log(allItems);
  }

  const { data: product } = await axios.get(`https://dummyjson.com/products/${productId}`);

  //Logic for Related Products
  const relatedProducts = await allItems
    .filter(item => item.category === product.category && item.id !== product.id);

  console.log(relatedProducts);

  return { product, relatedProducts };
};