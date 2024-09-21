import { http } from '../http';

const authService = {
	signIn: async (arg) => {
		try {
			const { data } = await http.post('/login', arg);
			localStorage.setItem('token', data.accessToken);

			return data;
		} catch (error) {
			console.log(error);
			return error;
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
	logout: async () => {
		try {
			const { data } = await http.post('/logout');
			localStorage.removeItem('token');

			return data;
		} catch (error) {
			console.log(error);
			return error;
		}
	},
	fetchMe: async () => {
		try {
			const { data } = await http.get('/users/me');

			return data;
		} catch (error) {
			console.log(error);
			return error;
		}
	},
};

export default authService;
