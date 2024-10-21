import { useSelector } from 'react-redux';
import { useMemo } from 'react';

import { Button, Stars } from '../../../../components/ui';

import { useReview } from '../../../../hooks/useAddReview';
import { selectUser } from '../../../../store/slices/userSlice';
import { selectIsAuth } from '../../../../store/slices/userSlice';
import { selectProductId } from '../../../../store/slices/productsSlice';

import styles from './Rating.module.sass';

export const Rating = ({ total, reviews }) => {
	const user = useSelector(selectUser);
	const isAuth = useSelector(selectIsAuth);
	const productId = useSelector(selectProductId);
	const isRated = useMemo(
		() => reviews?.some((review) => review.postedBy?._id === user?._id),
		[reviews, user?._id],
	);

	const { handleAdd, setActive, handleSetText, active, text, error } = useReview({
		productId,
		comment: '',
		star: 0,
	});

	return isRated || !isAuth ? (
		<div className={styles.total}>
			<span>Оценка пользователей: </span>
			<Stars className={styles.stars} selected={total} />
		</div>
	) : (
		<>
			<div className={styles.rate}>
				<Stars
					className={styles.stars}
					selected={active}
					setSelected={setActive}
					isEdit={true}
				/>

				<textarea
					className={styles.text}
					name="review"
					value={text}
					onChange={handleSetText}
				></textarea>
				<div className={styles.error}>{error}</div>
				<Button className={styles.btn} onClick={handleAdd}>
					Оставить отзыв
				</Button>
			</div>
		</>
	);
};
