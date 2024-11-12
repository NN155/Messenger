import axios from 'axios';
import queryString from 'query-string';
import { store, Actions } from '../container';

const API_URL = process.env.REACT_APP_API_URL;
const USERS = "users";
const USESR_API_URL = `${API_URL}/${USERS}`;

class UserService { 
    async getUser(params) { // userId
        try {
            const query = queryString.stringify(params);
            const url = `${USESR_API_URL}/get?${query}`;
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            throw new Error('Failed to fetch user data: ', error);
        }
    }

    async addUserInfo(userId) {
        const state = store.getState();
        const usersInfo = state.users.usersInfo;
        if (!usersInfo[userId]) {
            const user = await this.getUser({ userId });
            store.dispatch(Actions.User.addUser({ id: userId, user: user }));
        }
    }
}

export default new UserService();