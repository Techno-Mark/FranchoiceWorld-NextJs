import { configureStore } from "@reduxjs/toolkit";
import listBrandReducer from "./listBrandSlice";

export const store = configureStore({
  reducer: {
    listBrand: listBrandReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
