import { configureStore, createSlice } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import type { User } from "./types";

type InitialState = {
  users: User[];
};

const initialState: InitialState = {
  users: [],
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: (state, { payload }: { payload: User }) => {
      state.users.push(payload);
    },
    deleteUser: (state, { payload }: { payload: string }) => {
      state.users = state.users.filter((user) => user.id !== payload);
    },
    resetUsers: (state) => {
      state.users = [];
    },
  },
});

export const { addUser, deleteUser, resetUsers } = userSlice.actions;

export const store = configureStore({
  reducer: {
    users: userSlice.reducer,
  },
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
