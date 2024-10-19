import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { reviewService } from '../../services/reviewService';

export const addReview = createAsyncThunk(
	'review/addReview',
	async (args, { rejectWithValue }) => {
		try {
			const { data } = await reviewService.addReview(args);

			return data;
		} catch (error) {
			if (!error.response) {
				throw error;
			}
			rejectWithValue(error.response.data);
		}
	},
);

export const getReviews = createAsyncThunk(
	'review/getReviews',
	async (productId, { rejectWithValue }) => {
		try {
			const { data } = await reviewService.getReviews(productId);

			return data;
		} catch (error) {
			if (!error.response) {
				throw error;
			}
			rejectWithValue(error.response.data);
		}
	},
);

export const updateReview = createAsyncThunk(
	'review/updateReview',
	async (args, { rejectWithValue }) => {
		try {
			const { data } = await reviewService.updateReview(args);

			return data;
		} catch (error) {
			if (!error.response) {
				throw error;
			}
			rejectWithValue(error.response.data);
		}
	},
);

export const deleteReview = createAsyncThunk(
	'review/deleteReview',
	async (reviewId, { rejectWithValue }) => {
		try {
			const { data } = await reviewService.deleteReview(reviewId);

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
	data: null,
	error: '',
	lastPage: 1,
};

export const reviewSlice = createSlice({
	name: 'review',
	initialState,
	reducers: {
		setReviews: (state, action) => {
			state.data = action.payload.data;
			state.lastPage = action.payload.lastPage;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(addReview.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(addReview.fulfilled, (state, action) => {
				state.isLoading = false;
				state.data = action.payload;
				state.lastPage = action.payload.lastPage;
			})
			.addCase(addReview.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.error.message;
			})
			.addCase(getReviews.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getReviews.fulfilled, (state, action) => {
				state.isLoading = false;
				state.data = action.payload;
				state.lastPage = action.payload.lastPage;
			})
			.addCase(getReviews.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.error.message;
			})
			.addCase(deleteReview.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(deleteReview.fulfilled, (state, action) => {
				state.isLoading = false;
			})
			.addCase(deleteReview.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.error.message;
			})
			.addCase(updateReview.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(updateReview.fulfilled, (state, action) => {
				state.isLoading = false;
			})
			.addCase(updateReview.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.error.message;
			});
	},
});

export const selectReviews = (state) => state.review.data;

export const selectLastPage = (state) => state.review.lastPage;

export const selectTotalRating = (state) => state.review.data?.totalRating;

export const { setReviews } = reviewSlice.actions;

export default reviewSlice.reducer;
