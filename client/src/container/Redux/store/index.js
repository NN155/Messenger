import { configureStore } from "@reduxjs/toolkit"
import { usersReducer } from "../slices/users"


export const store = configureStore({
   reducer: { 
      users: usersReducer,
   }
});