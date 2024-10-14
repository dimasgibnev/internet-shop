import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import productService from '../../services/productService';
import { IProduct } from '../../interface/product.interface';
import { AxiosError } from 'axios';
import { setReviews } from './reviewSlice';

export interface IProductsState {
	error: string | undefined;
	isLoading: boolean;
	data: IProduct[] | [];
	product: IProduct | null;
	searchedProducts: IProduct[] | [];
	count: number | null;
}

export const fetchProducts = createAsyncThunk(
	'products/fetchProducts',
	async (filters, { rejectWithValue }) => {
		try {
			const data = await productService.fetchProducts(filters);

			return data;
		} catch (error: Error | AxiosError | any) {
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
		} catch (error: Error | AxiosError | any) {
			if (!error.response) {
				throw error;
			}
			rejectWithValue(error.response.data);
		}
	},
);

export const fetchProduct = createAsyncThunk(
	'products/fetchProduct',
	async (productId: string | undefined, { rejectWithValue, dispatch }) => {
		try {
			const { product, lastPage } = await productService.fetchProduct(productId);

			dispatch(
				setReviews({
					data: {
						totalRating: product.totalRating,
						reviews: product.reviews,
						productId,
					},
					lastPage,
				}),
			);

			return product;
		} catch (error: Error | AxiosError | any) {
			if (!error.response) {
				throw error;
			}
			rejectWithValue(error.response.data);
		}
	},
);

const initialState: IProductsState = {
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
export const selectCount = (state: RootState) => state.products.count;

export const selectLoading = (state: RootState) => state.products.isLoading;

export const selectProducts = (state: RootState) => state.products.data;

export const selectProduct = (state: RootState) => state.products.product;

export const selectProductId = (state: RootState) => state.products.product?._id;

export const selectSearchedProducts = (state: RootState) =>
	state.products.searchedProducts;

export const { resetProducts, resetProduct } = authSlice.actions;

export default authSlice.reducer;
