import { configureStore } from "@reduxjs/toolkit";
import  booksReducer, { BooksSlice } from "./features/booksSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
// import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    booksReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector