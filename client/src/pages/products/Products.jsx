import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Pagination, ProductCard } from '../../components';
import { Skeleton } from '../../components/productCard/components/Skeleton/Skeleton';

import { fetchProducts } from '../../store/slices/productsSlice';
import { findImage } from '../../utils/findImage';

import './Products.sass';

export const Products = () => {
	const params = useParams();
	const dispatch = useDispatch();
	const filter = params.category;
	const products = useSelector((state) => state.products.data) || [];
	const isLoading = useSelector((state) => state.products.isLoading);
	const [currentPage, setCurrentPage] = useState(1);
	const [limit, setLimit] = useState(8);
	const lastPage = useSelector((state) => state.products.lastPage);
	console.log('render');

	useEffect(() => {
		dispatch(fetchProducts({ page: currentPage, limit, filter }));
	}, [dispatch, currentPage, limit, filter]);

	return (
		products.length > 0 && (
			<div className="products">
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
					lastPage={Math.ceil(products.length / limit)}
				/>
			</div>
		)
	);
};
