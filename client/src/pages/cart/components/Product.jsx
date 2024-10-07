import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Button } from '../../../components';
import { Icon } from '../../../components/icon/Icon';

import { findImage } from '../../../utils/findImage';

import styles from '../Cart.module.sass';
import { removeFromCartAsync } from '../../../store/slices/userSlice';
import { fetchMe } from '../../../store/slices/authSlice';

export const Product = ({ id, count }) => {
	const products = useSelector((state) => state.products.data) || [];
	const product = products.find((product) => product._id === id);
	const dispatch = useDispatch();

	const handleRemoveFromCart = () => {
		dispatch(removeFromCartAsync(id)).then(() => dispatch(fetchMe()));
	}




	return (
		<>
			{product && (
				<div className={styles.product}>
					<div className={styles.img}>
						<Link to={`/products/details/${id}`}>
							<img
								src={findImage(product.images)}
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
							{product.price * count}
							{' ₽'}
						</div>
						<div className={styles.count}>
							<Button
								onClick={() => {}}
								disabled={true}
								className={styles['count-btn']}
							>
								−
							</Button>
							<div className={styles['count-value']}>{count}</div>
							<Button onClick={() => {}} className={styles['count-btn']}>
								+
							</Button>
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
