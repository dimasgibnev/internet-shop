import { useSelector } from 'react-redux';

import { ProductCard } from '../../../components';
import { Skeleton } from '../../../components/productCard/components/Skeleton/Skeleton';

import styles from '../Home.module.sass';
import { Arrows } from '../../../components/ui';
import { useState } from 'react';

export const ProductsCarousel = ({ products, title }) => {
	const [page, setPage] = useState(1);
	const isLoading = useSelector((state) => state.products.isLoading);

	return (
		<section className={styles.products}>
			<h2 className={styles.title}>{title}</h2>
			<div className={styles.wrapper}>
				<Arrows page={page} setPage={setPage}>
					{isLoading
						? new Array(4).fill(0).map((_, i) => <Skeleton key={i} />)
						: products.slice(page * 4 - 4, page * 4).map((product) => (
								<ProductCard key={product._id} product={product} />
							))}
				</Arrows>
			</div>
		</section>
	);
};
