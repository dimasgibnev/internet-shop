import { http } from '../http';

const categorieService = {
	fetchCategories: async () => {
		const { data } = await http.get('/categories');

		return data;
	},
};

export default categorieService;
