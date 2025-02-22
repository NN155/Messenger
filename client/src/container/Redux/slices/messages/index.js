import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    chats: {},
};

const messagesSlice = createSlice({
    name: "messages",
    initialState,
    reducers: {
        pushMessage: (state, action) => {
            const { chatId, message } = action.payload;
            if (!state.chats[chatId]) {
                state.chats[chatId] = [];
            }
            state.chats[chatId].push(message);
        },

        unshiftMessage: (state, action) => {
            const { chatId, message } = action.payload;
            if (!state.chats[chatId]) {
                state.chats[chatId] = [];
            }
            state.chats[chatId].unshift(message);
        },
        setMessage: (state, action) => {
            const { chatId, message } = action.payload;
            const chat = state.chats[chatId];
            if (!chat) {
                return;
            }
            const index = chat.findIndex((msg) => msg._id === message._id);
            if (index === -1) {
                return;
            }
            state.chats[chatId][index] = message;
        }
    },
});

export const { pushMessage, unshiftMessage, setMessage } = messagesSlice.actions;
export const messageReducer = messagesSlice.reducer;
