import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import productService from '../services/productService.ts';

export const fetchProducts = createAsyncThunk(
	'product/fetchProducts',
	async () => {
		try {
			const {data} = await productService.fetchProducts();

			return data;
		} catch (error) {
			if (!error.response) {
				throw error;
			}
		}
	},
);

const initialState = {
	error: null,
	isLoading: false,
	data: null,
};

const authSlice = createSlice({
	name: 'product',
	initialState,
	extraReducers: (builder) => {
		builder
			.addCase(fetchProducts.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(fetchProducts.fulfilled, (state, action) => {
				state.data = action.payload.user;
				state.isAuth = true;
				state.isLoading = false;
			})
			.addCase(fetchProducts.rejected, (state, action) => {
				state.error = action.error.message;
				state.isLoading = false;
			});
	},
});

const { reducer: productReducer, actions } = authSlice;

export default productReducer;
