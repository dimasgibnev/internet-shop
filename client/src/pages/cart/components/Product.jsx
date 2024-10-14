import { Link } from 'react-router-dom';

import { removeFromCartAsync } from '../../../store/slices/userSlice';
import { formatePrice } from '../../../utils/formatePrice';
import { useAppDispatch } from '../../../hooks/hooks';

import { Icon } from '../../../components/ui';

import styles from '../Cart.module.sass';

export const Product = ({ product, count  }) => {
	const dispatch = useAppDispatch();
	const { _id } = product;

	const handleRemoveFromCart = () => {
		dispatch(removeFromCartAsync(_id));
	};

	return (
		<>
			{product && (
				<div className={styles.product}>
					<div className={styles.img}>
						<Link to={`/products/details/${_id}`}>
							<img
								src={product.images[0].url}
								alt={product.title}
							></img>
						</Link>
					</div>
					<div className={styles.info}>
						<div className={styles.title}>{product.series}</div>
						<div className={styles.model}>{product.title}</div>
					</div>
					<div className={styles['price-info']}>
						<div className={styles.price}>
							{formatePrice(`${product.price * count}`)}
							{' ₽'}
						</div>
						<div className={styles.count}>
							{product.quantity === 0 && <span>Нет в наличии</span>}
						</div>
					</div>

					<Icon
						weight={'solid'}
						icon="trash"
						className={styles.trash}
						onClick={handleRemoveFromCart}
					/>
				</div>
			)}
		</>
	);
};
