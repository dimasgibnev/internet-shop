import React from 'react';
import styles from './CartInfo.module.sass';
import { Link } from 'react-router-dom';
export const CartInfo = ({ id, remove }) => {
	return (
		<div className={styles.counter}>
			<Link to={`/cart`} className={styles.text}>
				В корзине
			</Link>
			<div className={styles.info}>
				<i className={`${styles.remove} fa-solid fa-trash`} onClick={() => remove(id)} />
			</div>
		</div>
	);
};