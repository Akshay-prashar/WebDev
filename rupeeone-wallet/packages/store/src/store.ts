import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slices/counterSlice.js";
import  inputSlice  from "./slices/inputSlice.js";

export const makeStore = () => {
  return configureStore({
    reducer: {
      counter    : counterReducer,
      inputSlice : inputSlice
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];