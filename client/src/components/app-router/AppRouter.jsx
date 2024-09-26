import { Routes, Route } from 'react-router-dom';
import { Layout } from '../layout/Layout';
import { routeConfig } from '../../config/route.config';
import { PrivateRoute } from '../privateRoute/PrivateRoute';

export const AppRouter = () => {
	return (
		<Layout>
			<Routes>
				{routeConfig.map((route) => (
					<Route
						key={route.path}
						path={route.path}
						element={
							route.auth ? (
								<PrivateRoute roles={route.roles}>
									{route.element}
								</PrivateRoute>
							) : (
								route.element
							)
						}
					/>
				))}
			</Routes>
		</Layout>
	);
};