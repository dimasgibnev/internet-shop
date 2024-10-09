import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Pagination, ProductCard } from '../../components';
import { Skeleton } from '../../components/productCard/components/Skeleton/Skeleton';

import {
	fetchProducts,
	selectCount,
	selectLoading,
	selectProducts,
} from '../../store/slices/productsSlice';
import { selectSort, setCategory, setLine } from '../../store/slices/filterSlice';

import { Sort } from '../../components/ui';
import { LIMIT } from '../../constants/query';

import styles from './Products.module.sass';

export const Products = () => {
	const sort = useSelector(selectSort);
	const params = useParams();
	const dispatch = useDispatch();
	const [page, setPage] = useState(1);

	const products = useSelector(selectProducts) || [];
	const isLoading = useSelector(selectLoading);
	const totalCount = useSelector(selectCount);

	const lastPage = Math.ceil(totalCount / LIMIT);

	useEffect(() => {
		dispatch(setLine(params.line));
		dispatch(setCategory(params.category));
		const filter = {
			pagination: { page, limit: LIMIT },
			sort,
			category: params.category,
			line: params.line,
		};
		dispatch(fetchProducts(filter));
	}, [dispatch, page, sort, params.category, params.line]);

	return (
		<div className={styles.products}>
			<Sort />
			<div className={styles.wrapper}>
				{isLoading
					? new Array(LIMIT).fill(0).map((_, i) => <Skeleton key={i} />)
					: products.map((product) => (
							<ProductCard key={product._id} product={product} />
						))}
			</div>
			<Pagination
				className={styles.pagination}
				currentPage={page}
				lastPage={lastPage}
				setCurrentPage={setPage}
			/>
		</div>
	);
};
