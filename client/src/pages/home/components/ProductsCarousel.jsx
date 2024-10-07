import React from 'react';
import { useSelector } from 'react-redux';

import { findImage } from '../../../utils/findImage';

import { ProductCard } from '../../../components';
import { Skeleton } from '../../../components/productCard/components/Skeleton/Skeleton';

import styles from '../Home.module.sass';

export const ProductsCarousel = () => {
	const isLoading = useSelector((state) => state.products.isLoading);
	const products = useSelector((state) => state.products.data) || [];
	const newProducts = products && [...products].reverse().slice(0, 4);

	return (
		<section className={styles.products}>
			<h2 className={styles.title}>НОВИНКИ</h2>
			<div className={styles.wrapper}>
				{isLoading
					? new Array(4).fill(0).map((_, i) => <Skeleton key={i} />)
					: newProducts.map((product) => (
							<ProductCard
								key={product._id}
								id={product._id}
								image={findImage(product.images)}
								title={product.title}
								model={product.series}
								price={product.price}
							/>
						))}
			</div>
		</section>
	);
};
