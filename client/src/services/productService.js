import { http } from '../http';
import { addToCart } from '../store/userSlice';

const productService = {
	fetchProducts: async (args) => {
		try {
			const { data } = await http.get(
				`/products/?page=${args.page}&limit=${args.limit}`,
			);

			return data;
		} catch (error) {
			throw new Error(error.response.data.message);
		}
	},
	fetchProduct: async (id) => {
		try {
			const { data } = await http.get(`/products/${id}`);

			return data;
		} catch (error) {
			throw new Error(error.response.data.message);
		}
	},
	addProduct: async (arg) => {
		try {
			const { data } = await http.post('/products', arg);
			localStorage.setItem('token', data.accessToken);

			return data;
		} catch (error) {
			throw new Error(error.response.data.message);
		}
	},
	addToCart: async (arg) => {
		try {
			const { data } = await http.put('/products', arg);
			localStorage.setItem('token', data.accessToken);

			return data;
		} catch (error) {
			throw new Error(error.response.data.message);
		}
	},
	updateProduct: async (arg) => {
		try {
			const { data } = await http.patch('/products', arg);

			return data;
		} catch (error) {
			throw new Error(error.response.data.message);
		}
	},
	deleteProduct: async (id) => {
		try {
			const { data } = await http.get(`/products/${id}`);

			return data;
		} catch (error) {
			throw new Error(error.response.data.message);
		}
	},
	addToWishList: async (arg) => {
		try {
			const { data } = await http.put(`/products/wishlist`, arg);
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
};

export default productService;
