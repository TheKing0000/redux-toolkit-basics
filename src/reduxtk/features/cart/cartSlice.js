import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import cartItems from "../../mockdata";
import axios from "axios";
const url = "https://course-api.com/react-useReducer-cart-projects";

const initialState = {
  cartItems: [],
  amount: 0,
  total: 0,
  isLoading: true,
};

export const getCartItems = createAsyncThunk(
  "cart/getCartItems",
  async (passedParam, thunkApi) => {
    console.log(thunkApi.getState());
    try {
      const { data } = await axios.get(url);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue("hiba");
    }
  }
);
const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    clearCartItems: (state) => {
      state.cartItems = [];
      //   return {cartitems:[]} MINDEN MÁST KISZEDNE A STATE-BŐL, vagy pl az initialState-t adod visssza tehát reseteled
    },
    removeItem: (state, action) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter((item) => {
        return item.id !== itemId;
      });
    },
    increase: (state, action) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.map((item) => {
        if (item.id === itemId) {
          item.amount = item.amount + 1;
        }
        return item;
      });
    },
    decrease: (state, action) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.map((item) => {
        if (item.id === itemId) {
          if (item.amount > 0) {
            item.amount = item.amount - 1;
          }
        }
        return item;
      });
    },
    calculateTotal: (state) => {
      state.total = state.cartItems.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.amount * currentValue.price;
      }, 0);
    },
  },
  extraReducers: {
    [getCartItems.pending]: (state) => {
      state.isLoading = true;
    },
    [getCartItems.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.cartItems = action.payload;
    },
    [getCartItems.rejected]: (state, action) => {
      state.isLoading = false;
      console.log(action.payload);
    },
  },
});
export const {
  clearCartItems,
  removeItem,
  increase,
  decrease,
  calculateTotal,
} = cartSlice.actions;
export default cartSlice.reducer;
