import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { selectWishes } from '../../store/slices/userSlice';
import { userSelector } from '../../store/slices/authSlice';
import { resetFilter } from '../../store/slices/filterSlice';

import { ProductCard } from '../../components';

import styles from './Wishlist.module.sass';

export const WishList = () => {
	const dispatch = useDispatch();

	const user = useSelector(userSelector);
	const guestWishList = useSelector(selectWishes);

	const list = user?.wishList ? user.wishList : guestWishList;

	useEffect(() => {
		dispatch(resetFilter());
	}, [dispatch]);

	return (
		<div className={styles.container}>
			<h2>Избранное</h2>
			<div className={styles.list}>
				{list.length > 0 ? (
					list.map(({ product }) => (
						<ProductCard key={product._id} product={product} />
					))
				) : (
					<p>В избранном пока ничего нет</p>
				)}
			</div>
		</div>
	);
};
