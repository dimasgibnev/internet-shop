import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../store/slices/authSlice';
import {
	addToWishList,
	addToWishListAsync,
	selectWishes,
} from '../store/slices/userSlice';

export const useWishlist = (product) => {
	const dispatch = useDispatch();
	const user = useSelector(selectUser);
	const wishlist = useSelector(selectWishes);
	const inWish = wishlist.some((wishItem) => wishItem.product._id === product?._id);

	const handleAddToWishList = (id) => {
		if (!user) {
			dispatch(addToWishList(product));
		} else {
			dispatch(addToWishList(product));
			dispatch(addToWishListAsync(id));
		}
	};

	return { inWish, handleAddToWishList };
};
