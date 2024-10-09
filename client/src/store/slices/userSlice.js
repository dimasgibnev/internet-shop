import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import productService from '../../services/productService';

export const addToCartAsync = createAsyncThunk('user/addToCart', async (arg) => {
	try {
		const { cart } = await productService.addToCart(arg);

		return cart;
	} catch (error) {
		if (!error.response) {
			throw error;
		}
	}
});

export const removeFromCartAsync = createAsyncThunk(
	'user/removeFromCart',
	async (arg) => {
		try {
			const { data } = await productService.removeFromCart(arg);

			return data;
		} catch (error) {
			if (!error.response) {
				throw error;
			}
		}
	},
);

export const addToWishListAsync = createAsyncThunk(
	'product/addToWishList',
	async (arg) => {
		try {
			const { wishList } = await productService.addToWishList(arg);

			return wishList;
		} catch (error) {
			if (!error.response) {
				throw error;
			}
		}
	},
);

const initialState = {
	isAuth: false,
	error: null,
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
				({ product }) => product._id !== action.payload._id,
			);
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
			});
	},
});

export const selectWishes = (state) => state.user.wishList;

export const { addToWishList, addToCart, removeFromCart } = userSlice.actions;

export default userSlice.reducer;
