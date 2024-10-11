import { FC, useState } from 'react';
import { useAddReview } from '../../../../hooks/useAddReview';

import { Stars } from '../../../../components/ui';
import { Icon } from '../../../../components/ui/icon/Icon';

import { IReview } from '../../../../interface/review.interface';

import styles from './Review.module.sass';

type Props = {
	review: IReview
	productId: string | undefined;
};
export const Review: FC<Props> = ({
	review: { star, comment, postedBy, createdAt },
	productId,
}) => {
	const [isShow, setIsShow] = useState(false);
	const { handleSubmit, setText, setActive, setIsEdit, text, active, isEdit } =
		useAddReview({
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

			{isEdit ? (
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
			)}
			<span className={styles.show} onClick={() => setIsShow(!isShow)}>
				{isEdit ? '' : isShow ? 'Скрыть' : 'Показать еще'}
			</span>
		</div>
	);
};
