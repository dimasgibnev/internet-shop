import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import productService from '../../services/productService';
import { setReviews } from './reviewSlice';



export const fetchProducts = createAsyncThunk(
	'products/fetchProducts',
	async (filters, { rejectWithValue }) => {
		try {
			const data = await productService.fetchProducts(filters);

			return data;
		} catch (error) {
			if (!error.response) {
				throw error;
			}
			rejectWithValue(error.response.data);
		}
	},
);

export const fetchSearchedProducts = createAsyncThunk(
	'products/fetchSearchedProducts',
	async (filters, { rejectWithValue }) => {
		try {
			const data = await productService.fetchProducts(filters);

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
	async (productId, { rejectWithValue, dispatch }) => {
		try {
			const { product } = await productService.fetchProduct(productId);

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
	error: '',
	isLoading: false,
	data: [],
	product: null,
	searchedProducts: [],
	count: null,
};

const authSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {
		resetProducts: (state) => {
			state.searchedProducts = [];
		},
		resetProduct: (state) => {
			state.product = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchProducts.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(fetchProducts.fulfilled, (state, action) => {
				state.data = action.payload.products;
				state.count = action.payload.count;
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
			})
			.addCase(fetchSearchedProducts.pending, (state) => {})
			.addCase(fetchSearchedProducts.fulfilled, (state, action) => {
				state.searchedProducts = action.payload.products;
				state.isLoading = false;
			})
			.addCase(fetchSearchedProducts.rejected, (state, action) => {
				state.error = action.error.message;
				state.isLoading = false;
			});
	},
});
export const selectCount = (state) => state.products.count;

export const selectLoading = (state) => state.products.isLoading;

export const selectProducts = (state) => state.products.data;

export const selectProduct = (state) => state.products.product;

export const selectProductId = (state) => state.products.product?._id;

export const selectSearchedProducts = (state) =>
	state.products.searchedProducts;

export const { resetProducts, resetProduct } = authSlice.actions;

export default authSlice.reducer;
