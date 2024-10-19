import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { addReview, deleteReview, getReviews, updateReview } from '../store/slices/reviewSlice';
import { fetchMe } from '../store/slices/authSlice';

export const useReview = ({ comment, star, productId }) => {
	const dispatch = useDispatch();
	const [isEdit, setIsEdit] = useState(false);
	const [text, setText] = useState(comment || '');
	const [active, setActive] = useState(star || 0);
	const [error, setError] = useState('');

	const handleAdd = () => {
		if (text.length > 250) {
			setError('Слишком длинный комментарий');
			return;
		} else {
			setError('');
			dispatch(addReview({ productId, comment: text, star: active })).then(() =>
				dispatch(fetchMe()),
			);
		}
		setIsEdit(false);
	};

	const handleUpdate = (reviewId) => {
		if (text.length > 250) {
			setError('Слишком длинный комментарий');
			return;
		} else {
			setError('');
			dispatch(updateReview({ reviewId, comment: text, star: active })).then(() =>
				dispatch(getReviews(productId)),
			);
		}
		setIsEdit(false);
	};

	const handleDelete = (reviewId) => {
		dispatch(deleteReview(reviewId)).then(() => dispatch(fetchMe()));
		setIsEdit(false);
	};

	const handleSetText = (e) => {
		if (text.length < 250) {
			setError('');
		}
		setText(e.target.value);
	};
	return {
		handleAdd,
		handleUpdate,
		handleDelete,
		handleSetText,
		setActive,
		setIsEdit,
		text,
		active,
		isEdit,
		error,
	};
};
