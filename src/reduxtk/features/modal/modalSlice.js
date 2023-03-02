import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
};
const modalSlice = createSlice({
  name: "modal",
  initialState: initialState,
  reducers: {
    toogleModal: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});
export const { toogleModal } = modalSlice.actions;
export default modalSlice.reducer;
