import { Navigation, Catalog } from './components';
import './Header.sass';

export const Header = () => {
	return (
		<header className="header">
			<div className="container ">
				<Navigation />
			<hr />
				<Catalog />
			</div>
		</header>
	);
};
