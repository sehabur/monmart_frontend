import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
  name: 'products',
  initialState: null,
  reducers: {
    getAllProducts: (state, action) => action.payload,

    updateFavouriteItem: (state, action) => {
      for (let item of state) {
        if (item._id === action.payload.productId) {
          item.isFavourite = !action.payload.isFavourite;
          break;
        }
      }
    },
  },
});

export default productSlice;
