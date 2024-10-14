import { http } from '../http';

const productService = {
	fetchProducts: async (filters) => {
		let queryString = '';

		if (filters.line) {
			queryString += `line=${filters.line}&`;
		}

		if (filters.category) {
			queryString += `category=${filters.category}&`;
		}

		if (filters.pagination) {
			queryString += `page=${filters.pagination.page}&limit=${filters.pagination.limit}&`;
		}

		if (filters.sort) {
			queryString += `sort=${filters.sort.sort}&order=${filters.sort.order}&`;
		}

		if (filters.search) {
			queryString += `search=${filters.search}&`;
		}

		try {
			const { data } = await http.get(`/products?${queryString}`);

			return data;
		} catch (error) {
			return error;
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
};

export default productService;
