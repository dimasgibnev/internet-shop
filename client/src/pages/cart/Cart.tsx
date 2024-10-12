import { FC, useEffect, useState } from 'react';

import { Product } from './components/Product';
import { Order } from './components/Order';
import { EmptyCart } from './components/EmptyCart';
import { Pagination } from '../../components/ui';

import { resetFilter } from '../../store/slices/filterSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { selectCart } from '../../store/slices/userSlice';

import styles from './Cart.module.sass';

export const Cart: FC = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const dispatch = useAppDispatch();
	const cart = useAppSelector(selectCart);
	const lastPage = cart && Math.ceil(cart.length / 4);
	const productsInCart = cart.slice(currentPage * 4 - 4, currentPage * 4);

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
						className={styles.pagination}
						disabled={currentPage === lastPage}
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
