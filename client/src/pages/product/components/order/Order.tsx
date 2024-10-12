import { FC } from 'react';
import { Button } from '../../../../components/ui';
import { IProduct } from '../../../../interface/product.interface';

import { Link } from 'react-router-dom';
import { useCart } from '../../../../hooks/useCart';

import styles from './Order.module.sass';

type Props = {
	product: IProduct;
};

export const Order: FC<Props> = ({ product }) => {
	const { handleAddToCart, inCart } = useCart(product);

	return (
		<div className={styles.order}>
			<div className={styles.price}>
				<h3>{product.price} ₽</h3>
			</div>
			{product.quantity > 0 ? (
				<>
					{inCart ? (
						<Link to={'/cart'}>
							<Button className={styles.btn}>ОФОРМИТЬ</Button>
							<p>В наличии на складе &gt; {product.quantity} шт.</p>
						</Link>
					) : (
						<>
							<Button onClick={handleAddToCart} className={styles.btn}>
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
