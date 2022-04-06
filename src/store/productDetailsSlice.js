import { createSlice } from '@reduxjs/toolkit';

const productDetailsSlice = createSlice({
  name: 'productDetails',
  initialState: { data: null },
  reducers: {
    getProduct: (state, payload) => ({
      data: payload,
    }),
  },
});

export default productDetailsSlice;
