'use client'
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedCountry: 'Japan',
  isLoggedIn: false,
  userInfo: null,
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
    setUser: (state, action) => {
      state.userInfo = action.payload
    },
  },
});

export const { setCountry, setUrl, setTransferBooking, setLogin, setUser } = userSlice.actions;
export default userSlice.reducer;
