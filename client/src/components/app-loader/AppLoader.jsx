import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchMe } from '../../store/slices/authSlice';
import { fetchCategories } from '../../store/slices/categorySlice';
import { fetchProducts } from '../../store/slices/productsSlice';
import { Loader } from '../loader/Loader';

export const AppLoader = ({ children }) => {
	const dispatch = useDispatch();
	const isLoading = useSelector(
		(state) => state.auth.isLoading ,
	);

	useEffect(() => {
		if (localStorage.getItem('token')) {
			dispatch(fetchMe());
		}
		dispatch(fetchProducts());
		dispatch(fetchCategories());
	}, [dispatch]);

	return isLoading ? <Loader /> : children;
};
