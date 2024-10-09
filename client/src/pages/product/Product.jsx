import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import {
	fetchProduct,
	resetProduct,
	selectProduct,
} from '../../store/slices/productsSlice';

import { Order, ProductInfo } from './components';
import { Scroll } from '../../components';

import styles from './Product.module.sass';
import { Description } from './components/description/Description';

export const Product = () => {
	const dispatch = useDispatch();
	const params = useParams();

	const product = useSelector(selectProduct);

	useEffect(() => {
		dispatch(resetProduct());
		dispatch(fetchProduct(params.productId));
	}, [dispatch, params.productId]);

	if (!product) return <div className={styles.product}></div>;

	return (
		<div className={styles.product}>
			<div className={styles.title}>
				<span>{product.series}</span>
				<h2>{product.title}</h2>
			</div>
			<div className={styles.wrapper}>
				<div className={styles.info}>
					<ProductInfo product={product} />
					<Order product={product} />
				</div>
				<Description product={product} />
			</div>
			<Scroll />
		</div>
	);
};
