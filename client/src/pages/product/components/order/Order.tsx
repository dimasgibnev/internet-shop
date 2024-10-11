import { FC, PropsWithChildren } from 'react';
import { Button } from '../../../../components';
import { IProduct } from '../../../../interface/product.interface';

import styles from './Order.module.sass';

type Props = {
	product: IProduct;
};

export const Order: FC<PropsWithChildren<Props>> = ({ product }) => {
	return (
		<div className={styles.order}>
			<div className={styles.price}>
				<h3>{product.price} ₽</h3>
			</div>
			{product.quantity > 0 ? (
				<>
					<Button className={styles.btn}>ДОБАВИТЬ В КОРЗИНУ</Button>
					<p>В наличии на складе &gt; {product.quantity} шт.</p>
				</>
			) : (
				<>
					<Button className={styles['btn-disabled']}>
						Уведомить о наличии
					</Button>
					<p>Нет в наличии</p>
				</>
			)}
		</div>
	);
};
