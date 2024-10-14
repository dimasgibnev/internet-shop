import { useState } from 'react';
import { Link } from 'react-router-dom';

import styles from './Menu.module.sass';
import { useDispatch } from 'react-redux';
import {  updateFilter } from '../../../../../../store/slices/filterSlice';

export const Categorie = ({ categories, title }) => {
	const dispatch = useDispatch();
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
							onClick={() =>
								dispatch(
									updateFilter({
										category: cat,
										line: '',
									}),
								)
							}
						>
							{cat}
						</Link>
					))}
				</div>
			)}
		</div>
	);
};
