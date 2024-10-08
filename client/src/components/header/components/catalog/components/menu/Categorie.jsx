import { useState } from 'react';

import { Icon } from '../../../../../ui/icon/Icon';
import { Popup } from '../../../../../ui/popup/Popup';

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
	const links = categories.map((item, i) => {
		return <Link key={i} to={`/products/category/${item}`}>{item}</Link>
	})

	return (
		<div
			className={styles.item}
			onMouseLeave={closeCatalog}
			onMouseEnter={openCatalog}
		>
			{title}
			<Icon className={styles['item-icon']} icon="chevron-right" weight="solid" />

			{catalogIsOpen && <Popup className={styles['sub-menu']} links={categories} />}
		</div>
	);
};
