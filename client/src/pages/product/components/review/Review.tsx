import { FC, useState } from 'react';
import { useAddReview } from '../../../../hooks/useAddReview';

import { Stars, Icon } from '../../../../components/ui';

import { IReview } from '../../../../interface/review.interface';

import { useAppSelector } from '../../../../hooks/hooks';
import { selectUser } from '../../../../store/slices/userSlice';
import { selectProduct } from '../../../../store/slices/productsSlice';

import styles from './Review.module.sass';

type Props = {
	review: IReview;
};

export const Review: FC<Props> = ({ review }) => {
	const { star, comment, postedBy, createdAt } = review;
	const product = useAppSelector(selectProduct);
	const productId = product?._id;
	const user = useAppSelector(selectUser);
	const isUserAdded = user?._id === postedBy?._id;
	const [isShow, setIsShow] = useState(false);
	const { handleSubmit, setText, setActive, setIsEdit, text, active, isEdit } =
		useAddReview({
			productId,
			comment,
			star,
		});

	if (!review) {
		return (
			<div className={styles.review}>
				<div>Этот товар пока еще никто не оценил</div>
			</div>
		);
	}

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
						onChange={(e) => setText(e.target.value)}
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
				{isEdit || (comment && comment?.length < 150)
					? ''
					: isShow
						? 'Скрыть'
						: 'Показать еще'}
			</span>
		</div>
	);
};
