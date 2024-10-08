import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Pagination, ProductCard } from '../../components';
import { Skeleton } from '../../components/productCard/components/Skeleton/Skeleton';

import { fetchProducts } from '../../store/slices/productsSlice';
import { findImage } from '../../utils/findImage';

import './Products.sass';
import { useProducts } from '../../hooks/useProducts';
import { Sort } from '../../components/ui';

export const Products = () => {
	const params = useParams();
	const dispatch = useDispatch();
	const {
		products, currentPage,setCurrentPage, limit, lastPage, isLoading
	} = useProducts(params)

	useEffect(() => {
		dispatch(fetchProducts());
	}, [dispatch, currentPage, limit]);

	return (
		products.length > 0 && (
			<div className="products">
				<Sort />
				<div className="products-wrapper">
					{isLoading
						? new Array(limit).fill(0).map((_, i) => <Skeleton key={i} />)
						: products.map((product) => (
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
				<Pagination
					disabled={products.length < 1}
					currentPage={currentPage}
					setCurrentPage={setCurrentPage}
					lastPage={lastPage}
				/>
			</div>
		)
	);
};
