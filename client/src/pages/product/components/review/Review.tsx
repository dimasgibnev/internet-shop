import { FC, useState } from 'react';
import { useAddReview } from '../../../../hooks/useAddReview';

import { Stars, Icon } from '../../../../components/ui';

import { IReview } from '../../../../interface/review.interface';

import { useAppSelector } from '../../../../hooks/hooks';
import { selectUser } from '../../../../store/slices/userSlice';
import { selectProductId } from '../../../../store/slices/productsSlice';

import styles from './Review.module.sass';

type Props = {
	review: IReview;
};

export const Review: FC<Props> = ({ review }) => {
	const { star, comment, postedBy, createdAt } = review;
	const [isShow, setIsShow] = useState(false);

	const productId = useAppSelector(selectProductId);
	const user = useAppSelector(selectUser);

	const isUserAdded = user?._id === postedBy?._id;
	const isLengthEnough = comment.length > 150;

	const {
		handleSubmit,
		handleSetText,
		setActive,
		setIsEdit,
		text,
		active,
		isEdit,
		error,
	} = useAddReview({
		productId,
		comment,
		star,
	});

	return (
		<div className={styles.review}>
			<div className={styles.info}>
				{isEdit ? (
					<Stars
						selected={active}
						setSelected={setActive}
						className={styles['edit-stars']}
						isEdit={true}
					/>
				) : (
					<Stars selected={star} className={styles.stars} />
				)}
				<div className={styles.user}>
					<span>{postedBy?.firstName + ' ' + postedBy?.lastName}</span>
					<span>{createdAt?.slice(0, 10)}</span>
				</div>
			</div>

			<div className={styles['comment-wrapper']}>
				{isEdit ? (
					<textarea
						onChange={handleSetText}
						value={text}
						className={styles.text}
					></textarea>
				) : (
					<>
						<span>Комментарий: </span>
						<br />
						<div className={styles.comment}>
							{isShow ? comment : text.slice(0, 150)}
						</div>
					</>
				)}
				<div className={styles.error}>{error}</div>
			</div>

			{isUserAdded ? (
				isEdit ? (
					<Icon
						icon={'check'}
						className={styles.edit}
						weight={'solid'}
						onClick={handleSubmit}
					/>
				) : (
					<Icon
						icon={'pen-to-square'}
						className={styles.edit}
						weight={'regular'}
						onClick={() => setIsEdit(!isEdit)}
					/>
				)
			) : null}
			<span className={styles.show} onClick={() => setIsShow(!isShow)}>
				{isEdit || !isLengthEnough ? '' : isShow ? 'Скрыть' : 'Показать еще'}
			</span>
		</div>
	);
};
