import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { getOrder } from '../../../../store/slices/orderSlice';
import { formatePrice } from '../../../../utils/formatePrice';

import { ProductCard } from '../../../../components';
import { Button } from '../../../../components/ui';

import styles from './Order.module.sass';

export const Order = () => {
	const params = useParams();
	const dispatch = useDispatch();
	const order = useSelector((state) => state.order.order);

	useEffect(() => {
		dispatch(getOrder(params.id));
	}, [dispatch, params]);

	if (!order) {
		return null;
	}

	return (
		<div className={styles.order}>
			<div>
				<span className={styles.title}>
					Ваш заказ от {order.createdAt.slice(0, 10)}
				</span>
				<div className={styles.info}>
					<div className={styles.item}>
						<span>Стоимость: </span>
						<span>{formatePrice(`${order.totalPrice}`)} ₽</span>
					</div>
					<div className={styles.item}>
						<span>Статус:</span>
						<span>{order.status}</span>
					</div>
					<Button>Оплатить</Button>
				</div>
			</div>
			<div className={styles.products}>
				{order.products.map((product) => (
					<ProductCard product={product} key={product._id} />
				))}
			</div>
		</div>
	);
};
