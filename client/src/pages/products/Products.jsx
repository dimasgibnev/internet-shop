import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Skeleton } from '../../components/productCard/components/Skeleton/Skeleton';

import {
	fetchProducts,
	selectCount,
	selectLoading,
	selectProducts,
} from '../../store/slices/productsSlice';
import {
	selectCategory,
	selectLine,
	selectSort,
	setCategory,
	setLine,
} from '../../store/slices/filterSlice';

import { Sort, Pagination, Button } from '../../components/ui';
import { ProductCard } from '../../components';
import { Lines } from './components/Lines';

import { LIMIT } from '../../constants/query';

import styles from './Products.module.sass';

export const Products = () => {
	const [page, setPage] = useState(1);
	const dispatch = useDispatch();
	const params = useParams();
	const navigate = useNavigate();

	const sort = useSelector(selectSort);
	const category = useSelector(selectCategory);
	const line = useSelector(selectLine);
	const products = useSelector(selectProducts);
	const isLoading = useSelector(selectLoading);
	const totalCount = useSelector(selectCount);

	const lastPage = Math.ceil(totalCount / LIMIT);

	useEffect(() => {
		dispatch(setCategory(params.category || category));
		dispatch(setLine(params.line || line));

		const filter = {
			pagination: { page, limit: LIMIT },
			sort,
			category,
			line,
		};

		dispatch(fetchProducts(filter));
	}, [dispatch, page, sort, category, line, params.category, params.line]);

	if (products.length === 0) {
		return (
			<div className={styles.products}>
				<Lines />
				<div className={styles.empty}>
					<span>Здесь пока ничего нет, но скоро появится!</span>
					<Button onClick={() => navigate(-1)}>Вернуться назад</Button>
				</div>
			</div>
		);
	}
	
	return (
		<div className={styles.products}>
			<Sort />
			<Lines />
			<div className={styles.wrapper}>
				{isLoading
					? new Array(totalCount).fill(0).map((_, i) => <Skeleton key={i} />)
					: products.map((product) => (
							<ProductCard key={product._id} product={product} />
						))}
			</div>
			<Pagination
				disabled={lastPage === 1}
				className={styles.pagination}
				currentPage={page}
				lastPage={lastPage}
				setCurrentPage={setPage}
			/>
		</div>
	);
};
