import { Routes, Route } from 'react-router-dom';
import { Loader } from '../loader/Loader';
import { Header } from '../header/Header';
import { Page } from '../page/Page';
import { Footer } from '../footer/Footer';
import { ROUTES } from '../../constants';
import { AdminPanel, Authorization, Cart, Catalog, Main, ProductPage } from '../../pages';

export const AppRouter = () => {
	const isLoading = false;
	const isAuth = false;

	return isLoading ? (
		<Loader />
	) : (
		<>
			<Header />
			<Page>
				<Routes>
					{isAuth && (
						<>
							<Route path={ROUTES.ADMIN} element={<AdminPanel />} />
							<Route path={ROUTES.CART} element={<Cart />} />
						</>
					)}
					<Route path={ROUTES.MAIN} element={<Main />} />
					<Route path={ROUTES.LOGIN} element={<Authorization />} />
					<Route path={ROUTES.REGISTER} element={<Authorization />} />
					<Route path={ROUTES.PRODUCT} element={<ProductPage />} />
					<Route path={ROUTES.CATALOG} element={<Catalog />} />
					<Route path={ROUTES.CATALOG_COTEGORY} element={<Catalog />} />
					<Route path="*" element={<Main />} />
				</Routes>
			</Page>
			<Footer />
		</>
	);
};
