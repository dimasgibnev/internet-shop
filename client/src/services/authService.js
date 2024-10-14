import { http } from '../http';

const authService = {
	signIn: async (arg) => {
		try {
			const { data } = await http.post('/login', { ...arg });
			localStorage.setItem('token', data.accessToken);


			return data;
		} catch (error) {
			throw new Error(error.response.data.message);
		}
	},
	signUp: async (arg) => {
		try {
			const { data } = await http.post('/register', arg);
			localStorage.setItem('token', data.accessToken);

			return data;
		} catch (error) {
			throw new Error(error.response.data.message);
		}
	},
	fetchMe: async () => {
		try {
			const { data } = await http.get('/users/me');

			return data;
		} catch (error) {
			return error;
		}
	},
};

export default authService;
