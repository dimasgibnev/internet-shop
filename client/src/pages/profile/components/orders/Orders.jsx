import { Link } from 'react-router-dom';
import { useAppSelector } from '../../../../hooks/hooks';
import { selectOrders } from '../../../../store/slices/orderSlice';

import styles from './Order.module.sass';
import { formatePrice } from '../../../../utils/formatePrice';

export const Orders = () => {
	const orders = useAppSelector(selectOrders);
console.log(orders);

	if (!orders) return;

	return (
		<div className={styles.orders}>
			{orders &&
				orders.length > 0 &&
				orders.map(({ _id, createdAt, products, status, totalPrice }) => (
					<div key={_id} className={styles.order}>
						<div className={styles.product}>
							<div className={styles.img}>
								<img
									src={products.length > 0 && products[0].images[0].url}
									alt='Инструмент'
								/>
								{products.length > 1 && (
									<div className={styles.more}>
										<span>+{products.length - 1}</span>
										<div></div>
									</div>
								)}
							</div>
						</div>
						<div className={styles.info}>
							<div className={styles.item}>
								<span>Общая стоимость</span>
								<br />
								<span>{formatePrice(`${totalPrice}`)} ₽</span>
							</div>
							<div className={styles.item}>
								<span>Дата заказа</span>
								<br />
								<span>{createdAt.slice(0, 10)}</span>
							</div>
							<div className={styles.item}>
								<span>Статус</span>
								<br />
								<span>{status}</span>
							</div>
						</div>
						<Link to={`/profile/orders/${_id}`}>Подробнее</Link>
					</div>
				))}
		</div>
	);
};
