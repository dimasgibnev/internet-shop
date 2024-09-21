import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchMe } from '../../store/authSlice';

export const AppLoader = ({ children }) => {
	const dispatch = useDispatch();
	const isLoading = useSelector((state) => state.user.loading);

	useEffect(() => {
		if (localStorage.getItem('token')) {
			dispatch(fetchMe());
		}
	}, [dispatch]);

	if (isLoading) {
		return <h1>Loading</h1>;
	}

	return <div>{children}</div>;
};
