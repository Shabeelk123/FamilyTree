// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import memberSlice from "./memberSlice";

export const store = configureStore({
  reducer: {
    member: memberSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
