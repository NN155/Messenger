import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    messages: {},
};

const messagesSlice = createSlice({
    name: "messages",
    initialState,
    reducers: {
        addMessage: (state, action) => {
            const { chatId, message } = action.payload;
            if (!state.messages[chatId]) {
                state.messages[chatId] = [];
            }
            state.messages[chatId].unshift(message);
        },
    },
});

export const { addMessage } = messagesSlice.actions;
export const messageReducer = messagesSlice.reducer;
