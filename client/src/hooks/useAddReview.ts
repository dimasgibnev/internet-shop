import { useState } from 'react';
import { useAppDispatch } from './hooks';
import { addReview } from '../store/slices/reviewSlice';
import { fetchMe } from '../store/slices/authSlice';

type TypeReview = {
	productId: string | undefined;
	comment: string | undefined;
	star: number | undefined;
};

export const useAddReview = ({ comment, star, productId }: TypeReview) => {
	const dispatch = useAppDispatch();
	const [isEdit, setIsEdit] = useState(false);
	const [text, setText] = useState<string>(comment || '');
	const [active, setActive] = useState<number>(star || 0);

	const handleSubmit = (): void => {
		dispatch(addReview({ productId, comment: text, star: active })).then(() =>
			dispatch(fetchMe()),
		);
		setIsEdit(false);
	};

	return {
		handleSubmit,
		setText,
		setActive,
		setIsEdit,
		text,
		active,
		isEdit,
	};
};
