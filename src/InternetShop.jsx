import { Header, Footer, Page } from './components';
import { Routes, Route } from 'react-router-dom';
import { Authorization, Cart, Favourite, Profile } from './pages';
import { Main } from './pages/main/Main';
import { Loader } from './components/loader/Loader';
import './app.scss'

export const InternetShop = () => {
	const isLoading = false;

	return isLoading ? (
		<Loader />
	) : (
		<>
			<Header />
			<Page>
				<Routes>
					<Route path="/" element={<Main />} />
					<Route path="/login" element={<Authorization />} />
					<Route path="/cart" element={<Cart />} />
					<Route path="/favourite" element={<Favourite />} />
					<Route path="/profile" element={<Profile />} />
					<Route path="/register" element={<div>Регистрация</div>} />
					<Route path="/users" element={<div>Пользователи</div>} />
					<Route path="/goods" element={<div>Товары</div>} />
					<Route path="/goods/:goodId" element={<div>Товар</div>} />
					<Route
						path="/*"
						element={
							<div>Такая страница не существует или у вас нет прав</div>
						}
					/>
				</Routes>
			</Page>
			<Footer />
		</>
	);
};
