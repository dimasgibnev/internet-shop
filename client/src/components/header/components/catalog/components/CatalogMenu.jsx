import { useState } from 'react';

import { Menu } from './menu/Menu';

export const CatalogMenu = () => {
	const [catalogIsOpen, setCatalogIsOpen] = useState(false);
	const openCatalog = () => {
		setCatalogIsOpen(true);
	};

	const closeCatalog = () => {
		setCatalogIsOpen(false);
	};

	return (
		<div
			className="catalog__link-wrapper"
			onMouseLeave={closeCatalog}
			onMouseEnter={openCatalog}
		>
			<div className="catalog__link">
				{catalogIsOpen ? (
					<div className="menu__icon-wrapper">
						<i
							className="fa-solid fa-xmark menu-icons"
							onClick={closeCatalog}
						></i>
					</div>
				) : (
					<div className="menu__icon-wrapper">
						<i
							className="fa-solid fa-bars menu-icons"
							onClick={openCatalog}
						></i>
					</div>
				)}
				<span>Каталог</span>
				<Menu className={'catalog'} isOpen={catalogIsOpen} />
			</div>
		</div>
	);
};
