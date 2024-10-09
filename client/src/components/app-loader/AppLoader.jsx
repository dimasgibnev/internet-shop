import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchMe } from '../../store/slices/authSlice';
import { fetchCategories } from '../../store/slices/categorySlice';
import { fetchProducts } from '../../store/slices/productsSlice';
import { Loader } from '../ui/loader/Loader';
import {
	selectCategory,
	selectLine,
	selectPage,
	selectSort,
} from '../../store/slices/filterSlice';
import { LIMIT } from '../../constants/query';

export const AppLoader = ({ children }) => {
	const dispatch = useDispatch();
	const sort = useSelector(selectSort);
	const line = useSelector(selectLine);
	const category = useSelector(selectCategory);
	const page = useSelector(selectPage);
	const isLoading = useSelector((state) => state.auth.isLoading);

	useEffect(() => {
		const filter = {
			pagination: { page, limit: LIMIT },
			sort,
			line,
			category,
		};
		if (!!localStorage.getItem('token')) {
			dispatch(fetchMe());
		}
		dispatch(fetchProducts(filter));
		dispatch(fetchCategories());
	}, [dispatch, sort, line, category, page]);

	return isLoading ? <Loader /> : children;
};
