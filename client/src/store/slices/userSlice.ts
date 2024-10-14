import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { IProduct } from '../../interface/product.interface';
import { IUser } from '../../interface/user.interface';
import { RootState } from '../store';
import userService from '../../services/userService';

interface IUserState {
	isAuth: boolean;
	error: string | undefined;
	cart: { product: IProduct; count: number }[];
	wishList: { product: IProduct }[];
	isLoading: boolean;
	data: IUser | null;
}

export const addToCartAsync = createAsyncThunk(
	'user/addToCart',
	async (productId: string) => {
		try {
			const { cart } = await userService.addToCart(productId);

			return cart;
		} catch (error: Error | AxiosError | any) {
			if (!error.response) {
				throw error;
			}
		}
	},
);

export const removeFromCartAsync = createAsyncThunk(
	'user/removeFromCart',
	async (productId: string, thunkAPI) => {
		try {
			thunkAPI.dispatch(removeFromCart(productId));
			const { cart } = await userService.removeFromCart(productId);

			return cart;
		} catch (error: Error | AxiosError | any) {
			if (!error.response) {
				throw error;
			}
		}
	},
);
export const clearCartAsync = createAsyncThunk(
	'user/removeFromCart',
	async (type: string, thunkAPI) => {
		try {
			thunkAPI.dispatch(clearCart());
			const { cart } = await userService.removeFromCart(type);

			return cart;
		} catch (error: Error | AxiosError | any) {
			if (!error.response) {
				throw error;
			}
		}
	},
);

export const addToWishListAsync = createAsyncThunk(
	'product/addToWishList',
	async (productId: string) => {
		try {
			const { wishList } = await userService.addToWishList(productId);

			return wishList;
		} catch (error: Error | AxiosError | any) {
			if (!error.response) {
				throw error;
			}
		}
	},
);

export const saveAdress = createAsyncThunk(
	'product/saveAdress',
	async (productId: string) => {
		try {
			const data = await userService.saveAdress(productId);

			return data;
		} catch (error: Error | AxiosError | any) {
			if (!error.response) {
				throw error;
			}
		}
	},
);

const initialState: IUserState = {
	isAuth: false,
	error: '',
	cart: [],
	wishList: [],
	isLoading: false,
	data: null,
};

const userSlice = createSlice({
	name: 'product',
	initialState,
	reducers: {
		addToWishList: (state, action) => {
			const inList = state.wishList.some(
				({ product }) => product._id === action.payload._id,
			);

			if (inList) {
				state.wishList = state.wishList.filter(
					({ product }) => product._id !== action.payload._id,
				);
			} else {
				state.wishList.push({ product: action.payload });
			}
		},
		addToCart: (state, action) => {
			state.cart.push({ product: action.payload, count: 1 });
		},
		removeFromCart: (state, action) => {
			state.cart = state.cart.filter(
				({ product }) => product._id !== action.payload,
			);
		},
		clearCart(state) {
			state.cart = [];
		},
		setUser: (state, action: { payload: IUser }) => {
			state.cart = action.payload.cart;
			state.wishList = action.payload.wishList;
			state.data = action.payload;
			state.isAuth = true;
		},
		resetUser: (state) => {
			state.isAuth = false;
			state.data = null;
			state.cart = [];
			state.wishList = [];
			localStorage.removeItem('token');
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(addToCartAsync.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(addToCartAsync.fulfilled, (state, action) => {
				state.cart = action.payload;
				state.isLoading = false;
			})
			.addCase(addToCartAsync.rejected, (state, action) => {
				state.error = action.error.message;
				state.isLoading = false;
			})
			.addCase(removeFromCartAsync.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(removeFromCartAsync.fulfilled, (state, action) => {
				state.isLoading = false;
			})
			.addCase(removeFromCartAsync.rejected, (state, action) => {
				state.error = action.error.message;
				state.isLoading = false;
			})
			.addCase(addToWishListAsync.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(addToWishListAsync.fulfilled, (state, action) => {
				state.wishList = action.payload;
				state.isLoading = false;
			})
			.addCase(addToWishListAsync.rejected, (state, action) => {
				state.error = action.error.message;
				state.isLoading = false;
			})
			.addCase(saveAdress.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(saveAdress.fulfilled, (state) => {
				state.isLoading = false;
			})
			.addCase(saveAdress.rejected, (state, action) => {
				state.error = action.error.message;
				state.isLoading = false;
			});
	},
});

export const selectWishes = (state: RootState) => state.user.wishList;

export const selectCart = (state: RootState) => state.user.cart;

export const selectUser = (state: RootState) => state.user.data;

export const { addToWishList, addToCart, removeFromCart, setUser, resetUser, clearCart } =
	userSlice.actions;

export default userSlice.reducer;
