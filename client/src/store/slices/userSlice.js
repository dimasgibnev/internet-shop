import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import productService from '../../services/productService.ts';

export const addToCartAsync = createAsyncThunk('user/addToCart', async (arg) => {
	try {
		const {cart} = await productService.addToCart(arg);

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
			const data = await productService.addToWishList(arg);

			return data;
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
	cart:  [],
	wishList: [],
	isLoading: false,
	data: null,
};

const userSlice = createSlice({
	name: 'product',
	initialState,
	reducers: {
		addToWishList: (state, action) => {
			if (state.wishList.includes(action.payload)) {
				state.wishList = state.wishList.filter((id) => id !== action.payload);
			} else {
				state.wishList.push(action.payload);
			}
		},
		addToCart: (state, action) => {
			state.cart.push({ ...action.payload, count: 1 });
		},
		removeFromCart: (state, action) => {
			state.cart = state.cart.filter((item) => item.product !== action.payload);
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
				console.log(action.payload);

				state.wishList = action.payload;
				state.isLoading = false;
			})
			.addCase(addToWishListAsync.rejected, (state, action) => {
				state.error = action.error.message;
				state.isLoading = false;
			});
	},
});

export const { addToWishList, addToCart, removeFromCart } = userSlice.actions;

export default userSlice.reducer;
