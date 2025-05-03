import axios from 'axios';
import queryString from 'query-string';
import { store, Actions } from '../container';

const API_URL = process.env.REACT_APP_API_URL;
const USERS = "users";
const USESR_API_URL = `${API_URL}/${USERS}`;

class UserService { 
    async getUser(userId) {
        try {
            const query = queryString.stringify(userId);
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

    async login({password, usernameOrEmail}) {
        try {
            const url = `${API_URL}/users/login`;
            const response = await axios.post(url, { usernameOrEmail, password }, {
                withCredentials: true,
            });
            return response.data;
        } catch (error) {
            return error?.response?.data;
        }
    }

    async register({email, nickname, username, password}) {
        try {
            const url = `${API_URL}/users/register`;
            const response = await axios.post(url, { email, nickname, username, password }, {
                withCredentials: true,
            });
            return response.data;
        } catch (error) {
            return error?.response?.data;
        }
    }

    async auth() {
        try {
            const url = `${API_URL}/users/auth`;
            const response = await axios.post(url, {},{
                withCredentials: true,
            });
            return response.data;
        } catch (error) {
            return error?.response?.data;
        }
    }

    async checkUsernameAvailability(username) {
        try {
            const url = `${API_URL}/users/check-username-availability`;
            const response = await axios.post(url, { username }, {
                withCredentials: true,
            });
            return response.data;
        } catch (error) {
            return error?.response?.data;
        }
    }
}

export default new UserService();