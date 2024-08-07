'use client'
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedCountry: 'Japan',
  isLoggedIn: false,
  currentUid: null,
  currency: {
    sign: "",
    code: ""
  },
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
    setUserUid: (state, action) => {
      state.currentUid = action.payload
    },
    setCurrency: (state, action) => {
      state.currency = action.payload
    },
  },
});

export const { setCountry, setUrl, setTransferBooking, setLogin, setUser, setUserUid, setCurrency } = userSlice.actions;
export default userSlice.reducer;
