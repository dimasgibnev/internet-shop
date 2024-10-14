import axios from 'axios';
import { BASE_URL } from '../constants';

export const http = axios.create({
	withCredentials: true,
	baseURL: BASE_URL,
});

http.interceptors.request.use(
	async (config) => {
		const token = localStorage.getItem('token');

		if (token) {
			config.headers['Authorization'] = `Bearer ${token}`;
		}

		return config;
	},
	(error) => {
		return Promise.reject(error);
	},
);

http.interceptors.response.use(
	async (config) => {
		return config;
	},
	(error) => {
		if (error.status === 401) {
		}

		return Promise.reject(error);
	},
);
