import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import categoryService from '../../services/categoryService.js';

export const fetchCategories = createAsyncThunk(
	'category/fetchCategories',
	async (args, { rejectWithValue }) => {
		try {
			const { data } = await categoryService.fetchCategories();
			return data;
		} catch (error) {
			if (!error.response) {
				throw error;
			}
			rejectWithValue(error.response.data);
		}
	},
);

const initialState = {
	isLoading: false,
	data: [],
};

const filterSlice = createSlice({
	name: 'category',
	initialState,
	extraReducers: (builder) => {
		builder
			.addCase(fetchCategories.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(fetchCategories.fulfilled, (state, action) => {
				state.data = action.payload;
				state.isLoading = false;
			})
			.addCase(fetchCategories.rejected, (state, action) => {
				state.error = action.error.message;
				state.isLoading = false;
			});
	},
});

export default filterSlice.reducer;

export const { setSort } = filterSlice.actions;
