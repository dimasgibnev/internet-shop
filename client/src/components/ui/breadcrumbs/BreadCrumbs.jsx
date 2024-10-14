import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { selectCategories } from '../../../store/slices/categorySlice';
import styles from './BreadCrumbs.module.sass';
import { updateFilter } from '../../../store/slices/filterSlice';

export const BreadCrumbs = ({ product }) => {
	const dispatch = useAppDispatch();
	const categories = useAppSelector(selectCategories);
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
				onClick={() => handleUpdateFilter({ line, category: child })}
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
