import { FC, useMemo, useRef, useState } from 'react';
import { useAppSelector } from '../../../../hooks/hooks';
import { selectLastPage, selectReviews } from '../../../../store/slices/reviewSlice';

import { Review } from '../review/Review';

import styles from './Reviews.module.sass';
import { Rating } from '../rating/Rating';


export const Reviews: FC = () => {
	const reviewsRef = useRef<null | HTMLDivElement>(null);
	const [page, setPage] = useState(1);
	const data = useAppSelector(selectReviews);
	const lastPage = useAppSelector(selectLastPage);
	const reviews = data?.reviews;
	const totalRating = data?.totalRating
	const paginaitedReviews = useMemo(() => reviews?.slice(0, page * 2), [reviews, page]);

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

	return (
		<div className={styles.container}>
			<h3>Отзывы</h3>
			<div className={styles.wrapper}>
				<Rating total={totalRating} reviews={reviews}/>
				<div className={styles.reviews} ref={reviewsRef}>
					{paginaitedReviews &&
						paginaitedReviews.map((review) => (
							<Review
								
								review={review}
								key={review._id}
							/>
						))}
					<span onClick={handleShow} className={styles.show}>
						{reviews?.length === paginaitedReviews?.length
							? 'Скрыть'
							: 'Показать еще'}
					</span>
				</div>
			</div>
		</div>
	);
};
