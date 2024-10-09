import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useUser } from '../../hooks/useUser';

import { Product } from './components/Product';
import { Order } from './components/Order';
import { Pagination } from '../../components';
import { EmptyCart } from './components/EmptyCart';

import { resetFilter } from '../../store/slices/filterSlice';
import styles from './Cart.module.sass';

export const Cart = () => {
	const dispatch = useDispatch();
	const [currentPage, setCurrentPage] = useState(1);
	const { user } = useUser();
	const guestCart = useSelector((state) => state.user.cart);
	const products = user?.cart ? user.cart : guestCart;
	const lastPage = products && Math.ceil(products.length / 4);
	const productsInCart = products.slice(currentPage * 4 - 4, currentPage * 4);

	useEffect(() => {
		dispatch(resetFilter());
	});

	if (productsInCart.length === 0 && currentPage !== 1) {
		setCurrentPage(1);
	}

	if (productsInCart.length === 0 && currentPage === 1) {
		return <EmptyCart />;
	}

	return (
		<div className={styles.cart}>
			<div className={styles['cart-wrapper']}>
				<div className={styles.products}>
					{productsInCart.map(({ product, count }, i) => {
						return (
							<Product key={product._id} id={product._id} count={count} />
						);
					})}
					<Pagination
						currentPage={currentPage}
						setCurrentPage={setCurrentPage}
						lastPage={lastPage}
					/>
				</div>
				<Order cart={productsInCart} />
			</div>
		</div>
	);
};
