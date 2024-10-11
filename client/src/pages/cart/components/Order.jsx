import { Button } from '../../../components';

import { calculateOrder } from '../../../utils/calculateOrder';

import styles from '../Cart.module.sass';

export const Order = ({ cart }) => {
	const { count, price } = calculateOrder(cart);

	return (
		<div className={styles['order-wrapper']}>
			<div className={styles.order}>
				<span className={styles.title}>Оформить заказ</span>
				<div className={styles['order-info']}>
					<div className={styles.count}>
						<span>Количество товаров: </span>
						<div>{+count}</div>
					</div>
					<div className={styles.total}>
						<span>Общая стоимость: </span>
						<div>{+price} ₽</div>
					</div>
				</div>

				<Button className={styles['btn-order']}> Оформить </Button>
			</div>
		</div>
	);
};
