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
	async (error) => {
		if (error.response.status === 401 && error.config && !error.config._retry) {
			const originalRequest = error.config;
			try {
				originalRequest._retry = true;
				const response = await axios.get(`${BASE_URL}/refresh`, {
					withCredentials: true,
				});
				localStorage.setItem('token', response.data.accessToken);

				return http.request(originalRequest);
			} catch (error) {
				return Promise.reject(error);
			}
		}
		throw error;
	},
);
