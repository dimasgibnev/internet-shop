import { Button } from '../../../components';

import styles from '../Cart.module.sass';

export const Order = ({ cart }) => {
	let productCount = 0;
	let totalPrice = 0;
	cart.forEach(({ count, price }) => {
		(productCount += count) && (totalPrice += count * price);
	});

	return (
		<div className={styles['order-wrapper']}>
			<div className={styles.order}>
				<span className={styles.title}>Оформить заказ</span>
				<div className={styles['order-info']}>
					<div className={styles.count}>
						<span>Количество товаров: </span>
						<div>{+productCount}</div>
					</div>
					<div className={styles.total}>
						<span>Общая стоимость: </span>
						<div>{+totalPrice} ₽</div>
					</div>
				</div>

				<Button className={styles['btn-order']}> Оформить </Button>
			</div>
		</div>
	);
};
