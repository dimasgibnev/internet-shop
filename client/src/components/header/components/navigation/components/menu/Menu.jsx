import { useState } from 'react';
import { Popup } from '../../../../../ui/popup/Popup';
import { useSelector } from 'react-redux';
import { Categorie } from './Categorie';

import styles from './Menu.module.sass';

export const Menu = () => {
	const [catalogIsOpen, setCatalogIsOpen] = useState(false);
	const categories = useSelector((state) => state.category.data);
	const cats = categories.map((cat) => {
		return (
			<Categorie key={cat._id} title={cat.title} categories={cat.childCategories} />
		);
	});

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
			<div className={styles['catalog-link']}>
				{catalogIsOpen ? (
					<div className={styles.icon}>
						<i
							className="fa-solid fa-xmark menu-icons"
							onClick={closeCatalog}
						></i>
					</div>
				) : (
					<div className={styles.icon}>
						<i
							className="fa-solid fa-bars menu-icons"
							onClick={openCatalog}
						></i>
					</div>
				)}
				<Popup links={cats} className={styles.menu} isOpen={catalogIsOpen} />
			</div>
		</div>
	);
};
