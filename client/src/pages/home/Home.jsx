import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

import { fetchProducts } from '../../store/slices/productsSlice';

import { ProductsCarousel } from './components/ProductsCarousel.jsx';
import { Banners } from './components/Banners.jsx';

import styles from './Home.module.sass';
import { Scroll } from '../../components';

export const Home = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchProducts());
		window.scrollTo(0, 0);
	}, [dispatch]);

	return (
		<div className={styles.home}>
			<Banners />
			<ProductsCarousel />
			<Scroll />
		</div>
	);
};
