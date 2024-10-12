import { FC, useMemo } from 'react';
import { Button, Stars } from '../../../../components/ui';
import styles from './Rating.module.sass';
import { useAppSelector } from '../../../../hooks/hooks';
import { selectUser } from '../../../../store/slices/userSlice';
import { selectIsAuth } from '../../../../store/slices/authSlice';
import { IReview } from '../../../../interface/review.interface';
import { useAddReview } from '../../../../hooks/useAddReview';
import { selectProductId } from '../../../../store/slices/productsSlice';
type Props = {
	total: number | undefined;
	reviews: IReview[] | undefined;
};

export const Rating: FC<Props> = ({ total, reviews }) => {
	const user = useAppSelector(selectUser);
	const isAuth = useAppSelector(selectIsAuth);
	const productId = useAppSelector(selectProductId);
	const isRated = useMemo(
		() => reviews?.some((review) => review.postedBy?._id === user?._id),
		[reviews, user?._id],
	);

	const { handleSubmit, setActive, setText, active, text } = useAddReview({
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
					onChange={(e) => setText(e.target.value)}
				></textarea>
				<Button className={styles.btn} onClick={handleSubmit}>
					Оставить отзыв
				</Button>
			</div>
		</>
	);
};
