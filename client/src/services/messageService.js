import axios from 'axios';
import queryString from 'query-string';

const API_URL = process.env.REACT_APP_API_URL;
const MESSAGES = "messages";
const MESSAGE_API_URL = `${API_URL}/${MESSAGES}`;

class MessageService {
    async getMessages(params) { // {chatId, start, limit}
        try {
            const query = queryString.stringify(params);
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
    async sendMessage(data) { // {chatId, text}
        try {
            const url = `${MESSAGE_API_URL}/send`;
            const response = await axios.post(url, data, {
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