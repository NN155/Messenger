import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  usersInfo: {},
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: (state, action) => {
      const { id, user } = action.payload;
      if (!state.usersInfo[id]) {
        state.usersInfo[id] = user;
      }
    },
  },
});

export const { addUser } = usersSlice.actions;
export const usersReducer = usersSlice.reducer;
