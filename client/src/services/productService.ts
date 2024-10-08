import { http } from '../http';
import { IProduct } from '../interface/product.interface';
interface ResponseApi {
	products: IProduct[],
	lastPage: number
}
const productService = {
	fetchProducts: async () => {
		try {
			const { data } = await http.get(`/products`);

			return data;
		} catch (error) {
			return error
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

			return data;
		} catch (error) {
			throw new Error(error.response.data.message);
		}
	},
	addToCart: async (arg) => {
		try {
			const {data}  = await http.post('/cart', { productId: arg });
			
			return data;
		} catch (error) {
			throw new Error(error.response.data.message);
		}
	},
	removeFromCart: async (arg) => {
		try {
			const { data } = await http.delete(`/cart/${arg}`);

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
};

export default productService;
