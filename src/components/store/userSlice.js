'use client'
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedCountry: 'Japan',
  isLoggedIn: false,
  browserSetting: {
    url: ''
  },
  transferBooking: {}
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCountry: (state, action) => {
      state.selectedCountry = action.payload;
    },
    setUrl: (state, action) => {
      state.browserSetting.url = action.payload;
    },
    setTransferBooking: (state, action) => {
      state.transferBooking = action.payload;
    },
    setLogin: (state, action) => {
      state.isLoggedIn = action.payload;
    },
  },
});

export const { setCountry, setUrl, setTransferBooking, setLogin } = userSlice.actions;
export default userSlice.reducer;
