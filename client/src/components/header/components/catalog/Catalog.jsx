import { LinkWrapper } from '../LinkWrapper';
import { Menu } from './components/menu/Menu';

import './Catalog.sass';

export const Catalog = () => {
	return (
		<div className="catalog">
			<Menu />

			<LinkWrapper className="catalog" path={'/products/cordless'}>
				Аккумуляторные
			</LinkWrapper>

			<LinkWrapper className="catalog" path={'/products/corded'}>
				Сетевые
			</LinkWrapper>

			<LinkWrapper className="catalog" path={'/products/accessories'}>
				Акссесуары
			</LinkWrapper>
		</div>
	);
};
