import React from 'react';
import { Link } from 'react-router-dom';

import styles from './Menu.module.sass';

export const SideMenu = ({categories}) => {
	return (
		<div className={styles['item-menu']}>
			<ul>
				{categories.map((category) => (
					<Link className={styles.item} to={`/products/${category}`} key={category}>
						{category}
					</Link>
				))}
			</ul>
		</div>
	);
};
