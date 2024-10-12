import { http } from '../http';

export const reviewService = {
	addReview: async (arg) => {
		try {
			const  data  = await http.put('/products/rating', arg);
			return data;
		} catch (error) {
			throw new Error(error.response.data.message);
		}
	},
};
