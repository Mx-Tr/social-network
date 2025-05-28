import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import { fetchUserByUsername, fetchAllUsers, createUser } from "./usersApi"; // импорт экшенов

export interface User {
  id: number;
  username: string;
  email: string;
}

interface UsersState {
  current: User | null;
  list: User[]; // 👈 добавляем
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: UsersState = {
  current: null,
  list: [],
  status: "idle",
  error: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserByUsername.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchUserByUsername.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.status = "succeeded";
          state.current = action.payload;
        }
      )
      .addCase(fetchUserByUsername.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(createUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.current = action.payload;
      })
      .addCase(fetchAllUsers.fulfilled, (s, a: PayloadAction<User[]>) => {
        s.list = a.payload;
      });
  },
});

export const selectUsersList = (state: RootState): User[]       => state.users.list;
export const selectCurrentUser = (state: RootState): User | null => state.users.current;

export default usersSlice.reducer;
