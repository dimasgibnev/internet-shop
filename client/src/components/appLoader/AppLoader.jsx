import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchMe } from '../../store/authSlice';
import { fetchProducts } from '../../store/productSlice';
import { Loader } from '../loader/Loader';

export const AppLoader = ({ children }) => {
	const dispatch = useDispatch();
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(16);
	const isLoading = useSelector(
		(state) => state.auth.isLoading || state.product.isLoading,
	);

	useEffect(() => {
		if (localStorage.getItem('token') || isLoading) {
			dispatch(fetchMe());
		}

		dispatch(fetchProducts({ page, limit }));
	}, [dispatch]);

	return (
		<>
			{isLoading ? <Loader /> : null}
			{children}
		</>
	);
};
