import { Navigate } from 'react-router-dom';

export const PrivateRoute = ({ children, roles }) => {
	const auth = true;
	const userRole = ['admin'];

	const hasRole = roles.some((role) => userRole.includes(role));

	if (!auth) {
		return <Navigate to={'/login'} />;
	}

	if (!hasRole) {
		return <Navigate to={'/'} />;
	}

	return <>{children}</>;
};
