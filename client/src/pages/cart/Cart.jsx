import { useDispatch, useSelector } from 'react-redux';

import { Product } from './components/Product';
import { Order } from './components/Order';
import { EmptyCart } from './components/EmptyCart';

import { clearCartAsync, selectCart } from '../../store/slices/userSlice';

import styles from './Cart.module.sass';

export const Cart = () => {
	const dispatch = useDispatch();

	const cart = useSelector(selectCart);

	if (cart.length === 0) {
		return <EmptyCart />;
	}

	return (
		<div className={styles.cart}>
			<div className={styles['cart-wrapper']}>
				<div className={styles.products}>
					<div className={styles.clear}>
						<span
							onClick={() => {
								dispatch(clearCartAsync('clear'));
							}}
						>
							Очистить корзину
						</span>
					</div>
					{cart.map(({ product, count }, i) => {
						return (
							<Product key={product._id} product={product} count={count} />
						);
					})}
				</div>
				<Order cart={cart} />
			</div>
		</div>
	);
};
