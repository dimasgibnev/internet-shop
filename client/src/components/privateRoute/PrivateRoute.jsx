import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export const PrivateRoute = ({ children, roles }) => {
	const userRole = useSelector((state) => state.auth.data?.roleId);
	const auth = useSelector((state) => state.auth?.isAuth);
	const hasRole = roles.some((role) => userRole === role);

	if (!auth) {
		return <Navigate to={'/login'} />;
	}

	if (!hasRole) {
		return <Navigate to={'/'} />;
	}

	return <>{children}</>;
};
