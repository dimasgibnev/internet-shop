import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { reviewService } from '../../services/reviewService';
import { RootState } from '../store';
import { IReview } from '../../interface/review.interface';



interface IReviewState {
	isLoading: boolean;
	data: {
		reviews: IReview[] | undefined;
		totalRating: number;
	} | null;
	error: string | undefined;
	lastPage: number;
}

type TypeReview = {
	productId: string | undefined;
	comment: string;
	star: number;
};

export const addReview = createAsyncThunk(
	'review/addReview',
	async (args: TypeReview, { rejectWithValue }): Promise<IReviewState | any> => {
		try {
			const { data } = await reviewService.addReview(args);
			console.log(data);

			return data;
		} catch (error: Error | AxiosError | any) {
			if (!error.response) {
				throw error;
			}
			rejectWithValue(error.response.data);
		}
	},
);

const initialState: IReviewState = {
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
				state.data = action.payload.data;
				state.lastPage = action.payload.lastPage;
			})
			.addCase(addReview.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.error.message;
			});
	},
});

export const selectReviews = (state: RootState) => state.review.data;

export const selectLastPage = (state: RootState) => state.review.lastPage;

export const selectTotalRating = (state: RootState) => state.review.data?.totalRating;

export const { setReviews } = reviewSlice.actions;

export default reviewSlice.reducer;
