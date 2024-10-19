import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { ProductsCarousel } from './components/ProductsCarousel.jsx';
import { Banners } from './components/Banners.jsx';
import { Scroll } from '../../components/ui';

import { resetFilter, selectFilter } from '../../store/slices/filterSlice';
import { fetchProducts } from '../../store/slices/productsSlice';

import styles from './Home.module.sass';

export const Home = () => {
	const dispatch = useDispatch();
	const products = useSelector((state) => state.products.data) || [];
	const newProducts = products.slice(0, 8);
	const popular = products
		.slice()
		.sort((a, b) => b.totalRating - a.totalRating)
		.slice(0, 8);
	const filter = useSelector(selectFilter);

	useEffect(() => {
		dispatch(resetFilter());
		dispatch(fetchProducts(filter));
	}, [dispatch, filter]);

	return (
		<div className={styles.home}>
			<Banners />
			<ProductsCarousel title="НОВИНКИ" products={newProducts} />
			<ProductsCarousel title="ПОПУЛЯРНЫЕ ТОВАРЫ" products={popular} />
			<Scroll />
		</div>
	);
};
