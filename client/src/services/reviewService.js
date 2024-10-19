import { http } from '../http';

export const reviewService = {
	addReview: async (arg) => {
		try {
			const data = await http.post('/review', arg);
			return data;
		} catch (error) {
			throw new Error(error.response.data.message);
		}
	},
	getReviews: async (productId) => {
		try {
			const data = await http.get(`/review?productId=${productId}`);
			return data;
		} catch (error) {
			throw new Error(error.response.data.message);
		}
	},
	updateReview: async (args) => {
		try {
			const data = await http.patch(`/review/${args.reviewId}`, args);
			return data;
		} catch (error) {
			throw new Error(error.response.data.message);
		}
	},
	deleteReview: async (id) => {
		try {
			const data = await http.delete(`/review/${id}`);
			return data;
		} catch (error) {
			throw new Error(error.response.data.message);
		}
	},
};
