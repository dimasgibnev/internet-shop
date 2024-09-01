import { Link } from 'react-router-dom';

export const Navigation = ({setCatalogIsOpen, catalogIsOpen}) => {
	const handleOpenCatalog = () => {
		setCatalogIsOpen(prev => !prev)
	}

	return (
		<div className="navigation">
			<div className="navigation__link-wrapper">
				<Link className={catalogIsOpen ? 'navigation__active' : ''} to={'/catalog'} onMouseEnter={handleOpenCatalog}>Каталог</Link>
			</div>
			<div className="navigation__link-wrapper">
				<Link to={'/wishlist'}>Аккумуляторные</Link>
			</div>
			<div className="navigation__link-wrapper">
				<Link to={'/profile'}>Сетевые</Link>
			</div>
			<div className="navigation__link-wrapper">
				<Link to={'/login'}>Акссесуары</Link>
			</div>
		</div>
	);
};
