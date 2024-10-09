import { useState } from 'react';

import { Icon } from '../../../../../ui/icon/Icon';

import styles from './Menu.module.sass';
import { Link } from 'react-router-dom';

export const Categorie = ({ categories, title }) => {
	const [catalogIsOpen, setCatalogIsOpen] = useState(false);

	const openCatalog = () => {
		setCatalogIsOpen(true);
	};

	const closeCatalog = () => {
		setCatalogIsOpen(false);
	};

	return (
		<div
			onMouseLeave={closeCatalog}
			onMouseEnter={openCatalog}
			className={styles.cat}
		>
			{title}
			{catalogIsOpen && (
				<div className={styles['sub-menu']}>
					{categories.map((cat, i) => (
						<Link
							key={i}
							to={`/products/category/${cat}`}
							className={styles.item}
						>
							{cat}
						</Link>
					))}
				</div>
			)}
		</div>
	);
};
