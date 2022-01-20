import { createSlice } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";

const themeSlice = createSlice({
  name: "slice",
  initialState: {
    value: "light",
  },
  reducers: {
    themeChange: (state, action) => {
      state.value = action.payload === "light" ? "dark" : "light";
    },
  },
});

export const { themeChange } = themeSlice.actions;
export const theme = (state: any) => state.theme.value;

export default configureStore({
  reducer: {
    theme: themeSlice.reducer,
  },
});
