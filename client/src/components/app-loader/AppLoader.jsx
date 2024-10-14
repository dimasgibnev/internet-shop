import { useEffect } from 'react';
import { useDispatch} from 'react-redux';

import { fetchMe } from '../../store/slices/authSlice';
import { fetchCategories } from '../../store/slices/categorySlice';
import { getOrders } from '../../store/slices/orderSlice';
import { useLocation, useNavigate } from 'react-router-dom';

export const AppLoader = ({ children }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		navigate(location.pathname, { replace: true });

		if (!!localStorage.getItem('token')) {
			dispatch(fetchMe());
		}
		dispatch(getOrders());
		dispatch(fetchCategories());
	}, [dispatch, location.pathname, navigate]);

	return children;
};
