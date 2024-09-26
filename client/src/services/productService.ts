import { http } from '../http';

const productService = {
	fetchProducts: async () => {
		try {
			const { data } = await http.get('/products');

			return data;
		} catch (error) {
			throw new Error(error.response.data.message);
		}
	},
	fetchProduct: async (id: string) => {
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
	updateProduct: async (arg) => {
		try {
			const { data } = await http.patch('/products', arg);

			return data;
		} catch (error) {
			throw new Error(error.response.data.message);
		}
	},
	deleteProduct: async (id: string) => {
		try {
			const { data } = await http.get(`/products/${id}`);

			return data;
		} catch (error) {
			throw new Error(error.response.data.message);
		}
	},
	addToWishList: async (arg: { productId: string }) => {
		try {
			const { data } = await http.put(`/products/wishlist`, arg);

			return data;
		} catch (error) {
			throw new Error(error.response.data.message);
		}
	},
	addRating: async (arg: { star: number; productId: string; comment: string }) => {
		try {
			const { data } = await http.put(`/products/rating`, arg);

			return data;
		} catch (error) {
			throw new Error(error.response.data.message);
		}
	},
};

export default productService;
