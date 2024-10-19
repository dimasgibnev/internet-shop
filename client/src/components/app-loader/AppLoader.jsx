import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { fetchMe} from '../../store/slices/authSlice';
import { fetchCategories } from '../../store/slices/categorySlice';
import { getOrders } from '../../store/slices/orderSlice';
import { selectIsAuth } from '../../store/slices/userSlice';

export const AppLoader = ({ children }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();
	const isAuth = useSelector(selectIsAuth);

	useEffect(() => {
		navigate(location.pathname, { replace: true });

		if (!!localStorage.getItem('token')) {
			dispatch(fetchMe());
		}

		if (isAuth) {
			dispatch(getOrders());
		}

		dispatch(fetchCategories());
	}, [dispatch, location.pathname, navigate, isAuth]);

	return children;
};
