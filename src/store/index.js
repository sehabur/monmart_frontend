import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import cartSlice from './cartSlice';
import orderSlice from './orderSlice';
import productDetailsSlice from './productDetailsSlice';
import productsSlice from './productsSlice';

const store = configureStore({
  reducer: {
    products: productsSlice.reducer,
    productDetails: productDetailsSlice.reducer,
    cart: cartSlice.reducer,
    auth: authSlice.reducer,
    order: orderSlice.reducer,
  },
});

export const productsActions = productsSlice.actions;

export const productDetailsActions = productDetailsSlice.actions;

export const cartActions = cartSlice.actions;

export const authActions = authSlice.actions;

export const orderActions = orderSlice.actions;

export default store;
