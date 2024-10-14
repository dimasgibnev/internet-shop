import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { selectWishes } from '../../store/slices/userSlice';
import { resetFilter } from '../../store/slices/filterSlice';

import { ProductCard } from '../../components';

import styles from './Wishlist.module.sass';
import { Scroll } from '../../components/ui';

export const WishList = () => {
	const dispatch = useDispatch();
	const wishlist = useSelector(selectWishes);

	useEffect(() => {
		dispatch(resetFilter());
	}, [dispatch]);

	return (
	
			<div className={styles.container}>
				<h2>Избранное</h2>
				<div className={styles.list}>
					{wishlist.length > 0 ? (
						wishlist.map(({ product }) => (
							<ProductCard key={product._id} product={product} />
						))
					) : (
						<p>В избранном пока ничего нет</p>
					)}
				</div>
				<Scroll />
			</div>


	);
};
