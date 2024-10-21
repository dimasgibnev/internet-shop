import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userService from '../../services/userService';

export const addToCartAsync = createAsyncThunk('user/addToCart', async (productId) => {
	try {
		const { cart } = await userService.addToCart(productId);

		return cart;
	} catch (error) {
		if (!error.response) {
			throw error;
		}
	}
});

export const removeFromCartAsync = createAsyncThunk(
	'user/removeFromCart',
	async (productId, thunkAPI) => {
		try {
			thunkAPI.dispatch(removeFromCart(productId));
			const { cart } = await userService.removeFromCart(productId);

			return cart;
		} catch (error) {
			if (!error.response) {
				throw error;
			}
		}
	},
);
export const clearCartAsync = createAsyncThunk(
	'user/removeFromCart',
	async (type, thunkAPI) => {
		try {
			thunkAPI.dispatch(clearCart());
			const { cart } = await userService.removeFromCart(type);

			return cart;
		} catch (error) {
			if (!error.response) {
				throw error;
			}
		}
	},
);

export const addToWishListAsync = createAsyncThunk(
	'user/addToWishList',
	async (productId) => {
		try {
			const { wishList } = await userService.addToWishList(productId);

			return wishList;
		} catch (error) {
			if (!error.response) {
				throw error;
			}
		}
	},
);

export const saveAdress = createAsyncThunk('user/saveAdress', async (productId) => {
	try {
		const data = await userService.saveAdress(productId);

		return data;
	} catch (error) {
		if (!error.response) {
			throw error;
		}
	}
});

const initialState = {
	isAuth: false,
	error: '',
	cart: localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [],
	wishList: localStorage.getItem('wishList')
		? JSON.parse(localStorage.getItem('wishList'))
		: [],
	isLoading: false,
	data: null,
};

const userSlice = createSlice({
	name: 'user',
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

				localStorage.setItem('wishList', JSON.stringify(state.wishList));
			} else {
				state.wishList.push({ product: action.payload });

				localStorage.setItem('wishList', JSON.stringify(state.wishList));
			}
		},
		addToCart: (state, action) => {
			state.cart.push({ product: action.payload, count: 1 });

			localStorage.setItem('cart', JSON.stringify(state.cart));
		},
		removeFromCart: (state, action) => {
			state.cart = state.cart.filter(
				({ product }) => product._id !== action.payload,
			);

			localStorage.setItem('cart', JSON.stringify(state.cart));
		},
		clearCart(state) {
			state.cart = [];

			localStorage.removeItem('cart');
		},
		setUser: (state, action) => {
			state.cart = action.payload?.cart || [];
			state.wishList = action.payload?.wishList || [];
			state.data = action.payload;
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

export const selectWishes = (state) => state.user.wishList;

export const selectCart = (state) => state.user.cart;

export const selectUser = (state) => state.user.data;

export const selectIsAuth = (state) => state.user.isAuth;

export const { addToWishList, addToCart, removeFromCart, setUser, resetUser, clearCart } =
	userSlice.actions;

export default userSlice.reducer;
