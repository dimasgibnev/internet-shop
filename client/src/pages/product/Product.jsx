import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {
	fetchProduct,
	selectProduct,
} from '../../store/slices/productsSlice';

import { Order, ProductInfo, Reviews } from './components';
import { Stars, Scroll, BreadCrumbs } from '../../components/ui';

import { Description } from './components/description/Description';

import styles from './Product.module.sass';

export const Product = () => {
	const dispatch = useDispatch();
	const params = useParams();

	const product = useSelector(selectProduct);

	useEffect(() => {
		dispatch(fetchProduct(params.productId));
	}, [dispatch, params.productId]);

	if (!product) return <div className={styles.product}></div>;

	return (
		<div className={styles.product}>
			<BreadCrumbs product={product} />
			<div className={styles.title}>
				<span className={styles.text}>{product.series}</span>
				<h2>{product.title}</h2>
				<Stars className={styles.stars} selected={product.totalRating} />
			</div>
			<div className={styles.wrapper}>
				<div className={styles.info}>
					<ProductInfo product={product} />
					<Order product={product} />
				</div>
				<Description product={product} />
				<Reviews productId={product._id} />
			</div>
			<Scroll />
		</div>
	);
};
