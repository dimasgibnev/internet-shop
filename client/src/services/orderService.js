import { http } from '../http';

export const orderService = {
	createOrder: async (args) => {
		try {
			const { data } = await http.post('/cart/order', args);

			return data;
		} catch (error) {
			throw new Error(error.response.data.message);
		}
	},
	getOrder: async (orderId) => {
		try {
			const { data } = await http.get(`/cart/orders/${orderId}`);

			return data;
		} catch (error) {
			throw new Error(error.response.data.message);
		}
	},
	getOrders: async () => {
		try {
			const { data } = await http.get('/cart/orders');

			return data;
		} catch (error) {
			throw new Error(error.response.data.message);
		}
	},
	deleteOrder: async (orderId) => {
		try {
			const { data } = await http.delete(`/cart/orders/${orderId}`);

			return data;
		} catch (error) {
			throw new Error(error.response.data.message);
		}
	},
};
