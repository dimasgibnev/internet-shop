import { useSelector } from 'react-redux';

import { findImage } from '../../../utils/findImage';

import { ProductCard } from '../../../components';
import { Skeleton } from '../../../components/productCard/components/Skeleton/Skeleton';

import styles from '../Home.module.sass';

export const ProductsCarousel = ({ products }) => {
	const isLoading = useSelector((state) => state.products.isLoading);

	return (
		<section className={styles.products}>
			<h2 className={styles.title}>НОВИНКИ</h2>
			<div className={styles.wrapper}>
				{isLoading
					? new Array(4).fill(0).map((_, i) => <Skeleton key={i} />)
					: products.map((product) => (
							<ProductCard key={product._id} product={product} />
						))}
			</div>
		</section>
	);
};
