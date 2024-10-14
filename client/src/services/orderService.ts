import { AxiosError } from 'axios';
import { http } from '../http';
type Typeorder = {
	products: {
		product: string;
	}[];
};

export const orderService = {
	createOrder: async (args: Typeorder) => {
		try {
			const { data } = await http.post('/cart/order', args);

			return data;
		} catch (error: Error | AxiosError | any) {
			throw new Error(error.response.data.message);
		}
	},
	getOrder: async (orderId: string) => {
		try {
			const { data } = await http.get(`/cart/orders/${orderId}`);

			return data;
		} catch (error: Error | AxiosError | any) {
			throw new Error(error.response.data.message);
		}
	},
	getOrders: async () => {
		try {
			const { data } = await http.get('/cart/orders');

			return data;
		} catch (error: Error | AxiosError | any) {
			throw new Error(error.response.data.message);
		}
	},
};
