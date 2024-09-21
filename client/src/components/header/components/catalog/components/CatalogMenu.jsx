import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from '../../menu/Menu';

export const CatalogMenu = () => {
	const [catalogIsOpen, setCatalogIsOpen] = useState(false);

	const openCatalog = () => {
		setCatalogIsOpen(true);
	};

	const closeCatalog = () => {
		setCatalogIsOpen(false);
	};

	const links = [
		<Link to={'/products/cordless'}>Шуруповерты</Link>,
		<Link to={'/'}>Дрели</Link>,
	];
	return (
		<div
			className="catalog__link-wrapper"
			onMouseLeave={closeCatalog}
			onMouseEnter={openCatalog}
		>
			<span className="header__link">
				{catalogIsOpen ? (
					<i
						className="fa-solid fa-xmark menu-icons"
						onClick={closeCatalog}
					></i>
				) : (
					<i className="fa-solid fa-bars menu-icons" onClick={openCatalog}></i>
				)}
				Каталог
				<Menu className={'catalog'} isOpen={catalogIsOpen} links={links} />
			</span>
		</div>
	);
};
