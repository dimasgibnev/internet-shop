import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import productService from '../../services/productService.js';

export const fetchProducts = createAsyncThunk(
	'products/fetchProducts',
	async (args, { rejectWithValue }) => {
		try {
			const data = await productService.fetchProducts(args);

			return data;
		} catch (error) {
			if (!error.response) {
				throw error;
			}
			rejectWithValue(error.response.data);
		}
	},
);

export const fetchProduct = createAsyncThunk(
	'products/fetchProduct',
	async (args, { rejectWithValue }) => {
		try {
			const { product } = await productService.fetchProduct(args);

			return product;
		} catch (error) {
			if (!error.response) {
				throw error;
			}
			rejectWithValue(error.response.data);
		}
	},
);

const initialState = {
	error: null,
	isLoading: false,
	data: null,
	product: null,
	lastPage: null,
};

const authSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {
		setLoaded: (state, action) => {
			state.isLoading = false;
		},
		setLoading: (state, action) => {
			state.isLoading = true;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchProducts.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(fetchProducts.fulfilled, (state, action) => {
				state.data = action.payload.products;
				state.lastPage = action.payload.lastPage;
				state.isLoading = false;
			})
			.addCase(fetchProducts.rejected, (state, action) => {
				state.error = action.error.message;
				state.isLoading = false;
			})
			.addCase(fetchProduct.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(fetchProduct.fulfilled, (state, action) => {
				state.product = action.payload;
				state.isLoading = false;
			})
			.addCase(fetchProduct.rejected, (state, action) => {
				state.error = action.error.message;
				state.isLoading = false;
			});
	},
});

export const { setLoaded, setLoading } = authSlice.actions;

export default authSlice.reducer;
