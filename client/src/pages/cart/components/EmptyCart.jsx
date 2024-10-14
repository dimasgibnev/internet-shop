import { Order } from './Order';

import styles from '../Cart.module.sass';

export const EmptyCart = () => {
	return (
		<div className={styles.cart}>
			<div className={styles['cart-wrapper']}>
				<div className={styles.products}>
					<div className={styles['empty-cart']}>
						<h3>Ваша корзина пуста</h3>
					</div>
				</div>
				<Order cart={[]} />
			</div>
		</div>
	);
};
