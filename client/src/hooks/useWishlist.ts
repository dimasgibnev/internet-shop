import { IProduct } from "../interface/product.interface";
import { addToWishList, addToWishListAsync, selectUser } from "../store/slices/userSlice";
import { useAppDispatch, useAppSelector } from "./hooks";

export const useWishlist =(product: IProduct) => {
	const dispatch = useAppDispatch();
	const user = useAppSelector(selectUser);
	const inWish = user?.wishList.some((wishItem) => wishItem.product._id === product?._id);

	const handleAddToWishList = (id: string): void => {
		if (!user) {
			dispatch(addToWishList(product));
		} else {
			dispatch(addToWishListAsync(id));
		}
	};

	return {inWish, handleAddToWishList}

}