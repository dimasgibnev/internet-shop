import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { selectCategories } from '../../../store/slices/categorySlice';
import { updateFilter } from '../../../store/slices/filterSlice';

import styles from './BreadCrumbs.module.sass';

export const BreadCrumbs = ({ product }) => {
	const dispatch = useDispatch();
	const categories = useSelector(selectCategories);
	const productCategory = categories.find((category) =>
		category.childCategories.find((child) => child === product?.category),
	);
	let line = '';
	const child = productCategory?.childCategories.find(
		(child) => child === product?.category,
	);

	switch (product.line) {
		case 'cordless':
			line = 'Аккумуляторные';
			break;
		case 'corded':
			line = 'Сетевые';
			break;
		default:
			line = 'Бензотехника';
			break;
	}

	const handleUpdateFilter = (arg) => {
		dispatch(updateFilter(arg));
	};

	return (
		<div className={styles.breadcrumbs}>
			<span className={styles.text}>{productCategory?.title} / </span>
			<Link
				to={`/products/${product.line}`}
				onClick={() => handleUpdateFilter({ line, category: '' })}
			>
				<span className={styles.text}>{line} / </span>
			</Link>
			<Link
				to={`/products/category/${child}`}
				onClick={() => handleUpdateFilter({ category: child, line: '' })}
			>
				<span className={styles.text}>{child}</span>
			</Link>
		</div>
	);
};
