import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useUser } from '../../hooks/useUser';

import { Product } from './components/Product';
import { Order } from './components/Order';
import { Pagination } from '../../components';

import styles from './Cart.module.sass';

export const Cart = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const { user } = useUser();
	const guestCart = useSelector((state) => state.user.cart);
	const products = user ? user.cart : guestCart;
	const lastPage = products && Math.ceil(products.length / 4);
	const productPerPage = products.slice(currentPage * 4 - 4, currentPage * 4);

	if (productPerPage.length === 0 && currentPage !== 1) {
		setCurrentPage(1);
	}
	
	if (productPerPage.length === 0 && currentPage === 1) {
		return (
			<div className={styles.cart}>
				<div className={styles['cart-wrapper']}>
					<div className={styles.products}>
						<div className={styles['empty-cart']}>
							<h2>Ваша корзина пуста</h2>
						</div>
					</div>
					<Order cart={products} />
				</div>
			</div>
		);
	}

	return (
		<div className={styles.cart}>
			<div className={styles['cart-wrapper']}>
				<div className={styles.products}>
					{productPerPage.map(({ product, count }, i) => (
						<Product key={product} id={product} count={count} />
					))}
					<Pagination
						currentPage={currentPage}
						setCurrentPage={setCurrentPage}
						lastPage={lastPage}
					/>
				</div>
				<Order cart={products} />
			</div>
		</div>
	);
};
