import React, { useState } from 'react';

import { Icon } from '../../../../../icon/Icon';
import { SideMenu } from './SideMenu';

import styles from './Menu.module.sass';

export const Categorie = ({ categories, title }) => {
	const [catalogIsOpen, setCatalogIsOpen] = useState(false);

	const openCatalog = () => {
		setCatalogIsOpen(true);
	};

	const closeCatalog = () => {
		setCatalogIsOpen(false);
	};

	return (
		<li
			className={styles.item}
			onMouseLeave={closeCatalog}
			onMouseEnter={openCatalog}
		>
			{title}
			<Icon className={styles['item-icon']} icon="chevron-right" weight="solid" />
			<div className={styles.sideWrapper}>
				{catalogIsOpen && <SideMenu categories={categories} />}
			</div>
		</li>
	);
};
