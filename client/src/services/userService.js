import { http } from '../http';
import { addToCart } from '../store/slices/userSlice';

const userService = {
	addToCart: async (arg) => {
		try {
			const { data } = await http.post('/cart', { productId: arg });

			return data;
		} catch (error) {
			throw new Error(error.response.data.message);
		}
	},
	removeFromCart: async (productId) => {
		try {
			const {data} = await http.delete(`/cart/${productId}`);

			return data;
		} catch (error) {
			throw new Error(error.response.data.message);
		}
	},
	addToWishList: async (arg) => {
		try {
			const { data } = await http.put(`/products/wishlist`, { productId: arg });

			return data;
		} catch (error) {
			throw new Error(error.response.data.message);
		}
	},
	addRating: async (arg) => {
		try {
			const { data } = await http.put(`/products/rating`, arg);

			return data;
		} catch (error) {
			throw new Error(error.response.data.message);
		}
	},
	saveAdress: async (arg) => {
		try {
			const { data } = await http.put(`/users//save-address`, arg);

			return data;
		} catch (error) {
			throw new Error(error.response.data.message);
		}
	},
};

export default userService;
