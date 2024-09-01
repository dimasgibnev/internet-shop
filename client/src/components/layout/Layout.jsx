import { Outlet } from 'react-router-dom';
import { Footer } from '../footer/Footer';
import { Header } from '../header/Header';
import './Layout.sass';

export const Layout = () => {
	return (
		<>
			<Header />
			<div className="content">
				<Outlet />
			</div>
			<Footer />
		</>
	);
};
