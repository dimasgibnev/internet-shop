import { IProduct } from '../interface/product.interface';
import { selectUser } from '../store/slices/authSlice';
import {
	addToWishList,
	addToWishListAsync,
	selectWishes,
} from '../store/slices/userSlice';
import { useAppDispatch, useAppSelector } from './hooks';

export const useWishlist = (product: IProduct) => {
	const dispatch = useAppDispatch();
	const user = useAppSelector(selectUser);
	const wishlist = useAppSelector(selectWishes);
	const inWish = wishlist.some((wishItem) => wishItem.product._id === product?._id);

	const handleAddToWishList = (id: string): void => {
		if (!user) {
			dispatch(addToWishList(product));
		} else {
			dispatch(addToWishList(product));
			dispatch(addToWishListAsync(id));
		}
	};

	return { inWish, handleAddToWishList };
};
