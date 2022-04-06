import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: { data: null },
  reducers: {
    increaseCartItem: (state, action) => {
      for (let item of state.data) {
        if (item._id === action.payload._id) {
          item.quantity++;
          break;
        }
      }
    },
    decreaseCartItem: (state, action) => {
      for (let item of state.data) {
        if (item._id === action.payload._id) {
          item.quantity--;
          break;
        }
      }
    },
    addCartItem: (state, action) => {
      let matched = false;
      if (state.data) {
        for (let item of state.data) {
          if (item._id === action.payload._id) {
            item.quantity += action.payload.quantity;
            matched = true;
            break;
          }
        }
      }
      if (!matched) {
        state.data = state.data
          ? [...state.data, action.payload]
          : [action.payload];
      }
    },
    setCartItemfromStorage: (state, action) => ({
      data: action.payload,
    }),
    unselectCartItemForOrder: (state, action) => {
      for (let index in state.data) {
        if (state.data[index]._id === action.payload.productId) {
          state.data[index].isSelectedForOrder = action.payload.selectValue;
          break;
        }
      }
    },
    selectAllCartItem: (state, action) => {
      for (let index in state.data) {
        state.data[index].isSelectedForOrder = action.payload;
      }
    },
    removeItemFromCart: (state, action) => {
      state.data = state.data.filter((item) => item._id !== action.payload._id);
    },
    reset: () => ({ data: null }),
  },
});

export default cartSlice;
