import { configureStore } from "@reduxjs/toolkit"
import { usersReducer } from "../slices/users"
import { messageReducer } from "../slices/messages"


export const store = configureStore({
   reducer: { 
      users: usersReducer,
      messages: messageReducer,
   }
});