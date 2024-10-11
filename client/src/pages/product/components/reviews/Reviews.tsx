import { FC, useMemo } from 'react';
import { useAppSelector } from '../../../../hooks/hooks';
import {
	selectLastPage,
	selectReviews,
	selectTotalRating,
} from '../../../../store/slices/reviewSlice';

import { Button } from '../../../../components';
import { Review } from '../review/Review';
import { Stars } from '../../../../components/ui';

import { selectUser } from '../../../../store/slices/authSlice';
import { useAddReview } from '../../../../hooks/useAddReview';

import styles from './Reviews.module.sass';

type Props = {
	productId: string | undefined;
};

export const Reviews: FC<Props> = ({ productId }) => {
	const data = useAppSelector(selectReviews);
	const user = useAppSelector(selectUser);
	const lastPage = useAppSelector(selectLastPage);
	const totalRating = useAppSelector(selectTotalRating);

	const isRated = useMemo(
		() => data?.reviews?.some((review) => review?.postedBy?._id === user?._id),
		[data?.reviews, user?._id],
	);

	const { handleSubmit, setActive, setText, active, text } = useAddReview({
		productId,
		comment: '',
		star: 0,
	});

	return (
		<div className={styles.container}>
			<h3>Отзывы</h3>
			<div className={styles.wrapper}>
				{isRated ? (
					<div className={styles.total}>
						<span>Оценка пользователей: </span>
						<Stars className={styles.stars} selected={totalRating} />
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
				)}
				<div className={styles.reviews}>
					{data?.reviews &&
						data.reviews.map((review) => (
							<Review
								productId={productId}
								review={review}
								key={review._id}
							/>
						))}
				</div>
			</div>
		</div>
	);
};
