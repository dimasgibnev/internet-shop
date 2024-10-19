import { useSelector } from 'react-redux';
import { useState } from 'react';

import { useReview } from '../../../../hooks/useAddReview';

import { Stars, Icon } from '../../../../components/ui';

import { selectUser } from '../../../../store/slices/userSlice';
import { selectProductId } from '../../../../store/slices/productsSlice';

import styles from './Review.module.sass';
import { ROLES } from '../../../../constants/roles';

export const Review = ({ review }) => {
	const { star, comment, postedBy, createdAt } = review;
	const [isShow, setIsShow] = useState(false);

	const productId = useSelector(selectProductId);
	const user = useSelector(selectUser);

	const isUserAdded = user?._id === postedBy?._id;
	const isLengthEnough = comment.length > 150;
	const isAdmin = user?.roleId === ROLES.ADMIN;

	const {
		handleUpdate,
		handleDelete,
		handleSetText,
		setActive,
		setIsEdit,
		text,
		active,
		isEdit,
		error,
	} = useReview({
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

			{isUserAdded || isAdmin ? (
				isEdit ? (
					<Icon
						icon={'check'}
						className={styles.edit}
						weight={'solid'}
						onClick={() => handleUpdate(review._id)}
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
			{isAdmin && (
				<Icon
					weight={'solid'}
					icon="trash"
					className={styles.remove}
					onClick={() => { handleDelete(review._id) }}
				/>
			)}
			<span className={styles.show} onClick={() => setIsShow(!isShow)}>
				{isEdit || !isLengthEnough ? '' : isShow ? 'Скрыть' : 'Показать еще'}
			</span>
		</div>
	);
};
