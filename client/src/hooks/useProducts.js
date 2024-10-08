import { useState } from 'react';
import { useSelector } from 'react-redux';

export const useProducts = (query) => {
	const [currentPage, setCurrentPage] = useState(1);
	const [limit, setLimit] = useState(8);

	let products = useSelector((state) => state.products.data) || [];
	const isLoading = useSelector((state) => state.products.isLoading);

	products = products.filter((product) => {
		if (query.line) {
			return product.line === query.line
		}
		if(query.category) {
			return product.category === query.category
		}
		if (query.search) {
			return product.title.includes(query.search)
		}
		return product;
	});
	products = products.slice(currentPage * limit - limit, currentPage * limit);

	const lastPage = Math.ceil(products.length / limit);

	return {
		products,
		currentPage,
		setCurrentPage,
		limit,
		lastPage,
		isLoading,
	};
};
