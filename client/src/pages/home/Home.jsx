import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { ProductsCarousel } from './components/ProductsCarousel.jsx';
import { Banners } from './components/Banners.jsx';

import { Scroll } from '../../components';
import { resetFilter } from '../../store/slices/filterSlice';

import styles from './Home.module.sass';

export const Home = () => {
	const dispatch = useDispatch();
	const products = useSelector((state) => state.products.data) || [];
	const newProducts = products.slice(0, 4);

	useEffect(() => {
		dispatch(resetFilter());
	}, [dispatch]);

	return (
		<div className={styles.home}>
			<Banners />
			<ProductsCarousel products={newProducts} />
			<Scroll />
		</div>
	);
};
