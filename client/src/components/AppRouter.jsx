import { Routes, Route } from 'react-router-dom';
import { Layout } from './layout/Layout';
import { About, Home } from '../pages';
import { ROUTES } from '../routes';
import { Authorization } from '../pages/auth/Authorization';
export const AppRouter = () => {
	return (
		<Routes>
			<Route path={ROUTES.HOME} element={<Layout />}>
				<Route index element={<Home />} />
				<Route path={ROUTES.ABOUT} element={<About />} />
				<Route path={ROUTES.LOGIN} element={<Authorization />} />
			</Route>
		</Routes>
	);
};
