import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import productService from '../services/productService.js';

export const addToCartAsync = createAsyncThunk('user/addToCart', async (arg) => {
	try {
		const data = await productService.addToCart({ productId: arg });
		return data;
	} catch (error) {
		if (!error.response) {
			throw error;
		}
	}
});
export const addToWishListAsync = createAsyncThunk(
	'product/addToWishList',
	async (arg) => {
		try {
			const data = await productService.addToWishList({ productId: arg });

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
			if (state.wishList.includes(action.payload)) {
				state.wishList = state.wishList.filter((id) => id !== action.payload);
			} else {
				state.wishList.push(action.payload);
			}
		},
		addToCart: (state, action) => {
			if (state.cart.find((item) => item.id === action.payload.id)) {
				state.cart = state.cart.map((item) => {
					if (action.payload.count) {
						return { ...item, count: item.count + action.payload.count };
					} else {
						return { ...item, count: item.count + 1 };
					}
				});
			} else {
				state.cart.push({ id: action.payload.id, count: 1 });
			}
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
			.addCase(addToWishListAsync.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(addToWishListAsync.fulfilled, (state, action) => {
				state.isLoading = false;
				state.wishList = action.payload.wishList;
			})
			.addCase(addToWishListAsync.rejected, (state, action) => {
				state.error = action.error.message;
				state.isLoading = false;
			});
	},
});

const { reducer: userReducer, actions } = userSlice;

export const { addToWishList, addToCart } = actions;

export default userReducer;
