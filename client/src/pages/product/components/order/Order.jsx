import { Button } from '../../../../components/ui';

import { Link } from 'react-router-dom';
import { useCart } from '../../../../hooks/useCart';
import { formatePrice } from '../../../../utils/formatePrice';


import styles from './Order.module.sass';


export const Order = ({ product }) => {
	const { handleAddToCart, inCart } = useCart(product);

	return (
		<div className={styles.order}>
			<div className={styles.price}>
				<h3>{formatePrice(`${product.price}`)} ₽</h3>
			</div>
			{product.quantity > 0 ? (
				<>
					{inCart ? (
						<Link to={'/cart'}>
							<Button className={styles.btn}>ОФОРМИТЬ ЗАКАЗ</Button>
							<p>В наличии на складе &gt; {product.quantity} шт.</p>
						</Link>
					) : (
						<>
							<Button
								onClick={() => handleAddToCart(product)}
								className={styles.btn}
							>
								В КОРЗИНУ
							</Button>
							<p>В наличии на складе &gt; {product.quantity} шт.</p>
						</>
					)}
				</>
			) : (
				<>
					<Button className={styles['btn-disabled']}>НЕТ В НАЛИЧИИ</Button>
					<p>Нет в наличии</p>
				</>
			)}
		</div>
	);
};
