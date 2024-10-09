import { Order } from './Order';

import styles from '../Cart.module.sass';

export const EmptyCart = () => {
	return (
		<div className={styles.cart}>
			<div className={styles['cart-wrapper']}>
				<div className={styles.products}>
					<div className={styles['empty-cart']}>
						<h2>Ваша корзина пуста</h2>
					</div>
				</div>
				<Order cart={[]} />
			</div>
		</div>
	);
};
