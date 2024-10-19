import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Button } from '../../../components/ui';

import { calculateOrder } from '../../../utils/calculateOrder';
import { formatePrice } from '../../../utils/formatePrice';

import { createOrder } from '../../../store/slices/orderSlice';
import { selectIsAuth } from '../../../store/slices/userSlice';

import styles from '../Cart.module.sass';

export const Order = ({ cart }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { count, price } = calculateOrder(cart);
	const isAuth = useSelector(selectIsAuth);
	const order = cart.filter((item) => item.product.quantity > 0 );
	const isEmpty = cart.length === 0;

	const handleCreateOrder = () => {
		if (isEmpty && isAuth) {
			navigate('/');
		} else if (!isAuth) {
			navigate('/login');
		} else {
			dispatch(createOrder({ products: order, totalPrice: price }));
		}
	};

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
						<div>{formatePrice(`${price}`)} ₽</div>
					</div>
				</div>

				{!isAuth ? (
					<Button className={styles['btn-order']} onClick={handleCreateOrder}>
						Войти
					</Button>
				) : (
					<Button className={styles['btn-order']} onClick={handleCreateOrder}>
						{isEmpty ? 'К покупкам' : 'Оформить заказ'}
					</Button>
				)}
			</div>
		</div>
	);
};
