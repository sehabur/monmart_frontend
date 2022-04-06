import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  shippingAddress: null,
  paymentMethod: null,
  orderItems: null,
  shippingCost: 0,
  totalProductPrice: 0,
  totalAmount: 0,
  isPaid: false,
  isDelivered: false,
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
    },
    setPaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
    },
    setProducts: (state, action) => {
      state.orderItems = action.payload;
    },
    setAmount: (state, action) => {
      state.shippingCost = action.payload.shippingCost;
      state.totalProductPrice = action.payload.totalProductPrice;
      state.totalAmount = action.payload.totalAmount;
    },
    reset: () => initialState,
  },
});

export default orderSlice;
