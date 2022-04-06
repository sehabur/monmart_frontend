import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: { data: null },
  reducers: {
    login: (state, action) => ({
      data: action.payload,
    }),

    logout: () => ({ data: null }),
  },
});

export default authSlice;
