import { useSelector } from 'react-redux';
import { Footer } from '../footer/Footer';
import { Header } from '../header/Header';
import { Loader } from '../ui/loader/Loader';

import './Layout.sass';

export const Layout = ({ children }) => {
	const isLoading = useSelector((state) => state.auth.isLoading);
	return (
		<>
			<Header />
			{isLoading ? <Loader /> : <div className="container">{children}</div>}
			<Footer />
		</>
	);
};
