import { LinkWrapper } from '../LinkWrapper';
import { CatalogMenu } from './components/CatalogMenu';
import './Catalog.sass';

export const Catalog = () => {
	return (
		<div className="catalog">
			<CatalogMenu />

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
