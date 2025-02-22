import axios from 'axios';
import queryString from 'query-string';
import { store, Actions } from '../container';
import userService from './userService';

const API_URL = process.env.REACT_APP_API_URL;
const MESSAGES = "messages";
const MESSAGE_API_URL = `${API_URL}/${MESSAGES}`;

class MessageService {
    async _getMessages({chatId, start, limit}) {
        try {
            const query = queryString.stringify({chatId, start, limit});
            const url = `${MESSAGE_API_URL}/get?${query}`;
            const response = await axios.get(url, {
                withCredentials: true
            });
            return response.data;
        } catch (error) {
            console.error('Error getting messages:', error);
            throw error;
        }
    }

    groupMessages(prevMessage, nextMessage) {
        const sameSender = prevMessage.senderId === nextMessage.senderId;
        nextMessage.showUserInfo = true;
        if (!sameSender) {
            return;
        }
        const timeDifference = new Date(nextMessage.createdAt) - new Date(prevMessage.createdAt);
        const timeDifferenceInMinutes = timeDifference / 1000 / 60;
        if (timeDifferenceInMinutes < 3) {
            nextMessage.showUserInfo = false;
            return;
        }
    }

    async getMessages({chatId, start, limit}) {
        const data = await this._getMessages({chatId, start, limit});
        for (let i = 0 ; i < data.length; i++) {
            let newMessage = {...data[i], showUserInfo: true};
            await this.pushMessage({chatId, message: newMessage});
        }
    }

    async pushMessage({chatId, message}) {
        // Add user info to the message
        await userService.addUserInfo(message.senderId);
        // Group messages by time and sender
        const chat = store.getState().messages.chats[chatId];
        if (chat && chat.length) {
            const lastMessage = {...chat[chat.length - 1]};
            this.groupMessages(message, lastMessage);
            this.setMessage({chatId, message: lastMessage});
        }
        store.dispatch(Actions.Message.pushMessage({ chatId, message: message }));
    }

    async unshiftMessage({chatId, message}) {
        // Add user info to the message
        await userService.addUserInfo(message.senderId);
        // Group messages by time and sender
        const chat = store.getState().messages.chats[chatId];
        if (chat && chat.length) {
            const firstMessage = chat[0];
            this.groupMessages(firstMessage, message);
            this.setMessage({chatId, message: message});
        }
        store.dispatch(Actions.Message.unshiftMessage({ chatId, message: message }));
    }

    setMessage({chatId, message}) {
        store.dispatch(Actions.Message.setMessage({ chatId, message: message }));
    }

    async sendMessage({chatId, text}) {
        try {
            const url = `${MESSAGE_API_URL}/send`;
            const response = await axios.post(url, {chatId, text}, {
                withCredentials: true
            });
            return response.data;
        } catch (error) {
            console.error('Error sending message:', error);
            throw error;
        }
    }
}

export default new MessageService();