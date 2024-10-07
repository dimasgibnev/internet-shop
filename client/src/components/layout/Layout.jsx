import { Footer } from '../footer/Footer';
import { Header } from '../header/Header';

import './Layout.sass';

export const Layout = ({ children }) => {
	return (
		<>
			<Header />
				<div className="container">{children}</div>
			<Footer />
		</>
	);
};
