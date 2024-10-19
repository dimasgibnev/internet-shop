import { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
	getReviews,
	selectLastPage,
	selectReviews,
} from '../../../../store/slices/reviewSlice';

import { Review } from '../review/Review';
import { Rating } from '../rating/Rating';

import styles from './Reviews.module.sass';

export const Reviews = ({ productId }) => {
	const dispatch = useDispatch();
	const reviewsRef = useRef(null);
	const [page, setPage] = useState(1);
	const data = useSelector(selectReviews);
	const lastPage = useSelector(selectLastPage);
	const reviews = data?.reviews;
	const totalRating = data?.totalRating;
	const paginaitedReviews = useMemo(() => reviews?.slice(0, page * 2), [reviews, page]);

	useEffect(() => {
		dispatch(getReviews(productId));
	}, [productId, dispatch]);

	const handleShow = () => {
		setPage((prev) => {
			if (!(prev === lastPage)) {
				return (prev += 1);
			} else {
				reviewsRef?.current?.scrollIntoView({
					behavior: 'smooth',
					block: 'start',
				});
				return (prev = 1);
			}
		});
	};

	if (!reviews?.length) {
		return (
			<div className={styles.container}>
				<h3>Отзывы</h3>
				<div className={styles.wrapper}>
					<Rating total={totalRating} reviews={reviews} />
					<div className={styles.reviews} ref={reviewsRef}>
						<p className={styles.empty}>Этот товар пока никто не оценил.</p>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className={styles.container}>
			<h3>Отзывы</h3>
			<div className={styles.wrapper}>
				<Rating total={totalRating} reviews={reviews} />
				<div className={styles.reviews} ref={reviewsRef}>
					{paginaitedReviews &&
						paginaitedReviews.map((review) => (
							<Review review={review} key={review._id} />
						))}
					<span onClick={handleShow} className={styles.show}>
						{reviews?.length < 2
							? ''
							: reviews?.length === paginaitedReviews?.length
								? 'Скрыть'
								: 'Показать еще'}
					</span>
				</div>
			</div>
		</div>
	);
};
