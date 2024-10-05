'use client'
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [
        //Test cart data

    ],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setCart: (state, action) => {
            state.items = action.payload
        },
        addItem: (state, action) => {
            state.items.push(action.payload);
        },
        removeItem: (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload);
        },
        updateItem: (state, action) => {
            const index = state.items.findIndex(item => item.id === action.payload.id);
            if (index !== -1) {
                state.items[index] = { ...state.items[index], ...action.payload };
            }
        }
    },
});

export const { addItem, removeItem, updateItem, setCart } = cartSlice.actions;
export default cartSlice.reducer;
