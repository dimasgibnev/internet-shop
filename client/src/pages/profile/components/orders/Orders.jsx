import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {
	deleteOrder,
	getOrders,
	selectOrders,
} from '../../../../store/slices/orderSlice';
import { formatePrice } from '../../../../utils/formatePrice';

import styles from './Order.module.sass';
import { ROLES } from '../../../../constants/roles';
import { Button } from '../../../../components/ui';
import { useEffect } from 'react';

export const Orders = () => {
	const dispatch = useDispatch();
	const orders = useSelector(selectOrders);
	const isAdmin = useSelector((state) => state.user?.data.roleId === ROLES.ADMIN);

	useEffect(() => {
		dispatch(getOrders());
	}, [dispatch]);

	const handleDelete = (id) => {
		dispatch(deleteOrder(id)).then(() => dispatch(getOrders()));
	};

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
									src={products  && products[0]?.images[0].url}
									alt="Инструмент"
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
						{isAdmin && (
							<Button
								className={styles.delete}
								onClick={() => handleDelete(_id)}
							>
								Удалить
							</Button>
						)}
					</div>
				))}
		</div>
	);
};
