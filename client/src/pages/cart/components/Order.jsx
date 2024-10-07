import { useSelector } from 'react-redux';
import { Button } from '../../../components';

import styles from '../Cart.module.sass';

export const Order = ({ cart }) => {
	let productCount = 0;
	let totalPrice = 0;

	const products = useSelector((state) => state.products.data) || [];
	
	cart.forEach((item) => {
		const product = products.find((product) => product._id === item.product);
		if (product && product.quantity > 0) {
			productCount += item.count;
			totalPrice += item.price * item.count;
		}
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
