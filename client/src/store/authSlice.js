import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import authService from '../services/authService';

export const signIn = createAsyncThunk(
	'auth/signIn',
	async (args, { rejectWithValue }) => {
		try {
			const data = await authService.signIn(args);

			return data;
		} catch (error) {
			if (!error.response) {
				throw error;
			}

			rejectWithValue(error.response.data);
		}
	},
);

export const signUp = createAsyncThunk(
	'auth/signUp',
	async (args, { rejectWithValue }) => {
		try {
			const data = await authService.signUp(args);

			return data;
		} catch (error) {
			if (!error.response) {
				throw error;
			}

			rejectWithValue(error.response.data);
		}
	},
);

export const fetchMe = createAsyncThunk('auth/fetchMe', async () => {
	const data = await authService.fetchMe();

	return data;
});

export const logout = createAsyncThunk('auth/logout', async () => {
	const data = await authService.logout();

	return data;
});

const initialState = {
	isAuth: false,
	error: null,
	isLoading: false,
	data: null,
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	extraReducers: (builder) => {
		builder
			.addCase(signIn.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(signIn.fulfilled, (state, action) => {
				state.data = action.payload.user;
				state.isAuth = true;
				state.isLoading = false;
			})
			.addCase(signIn.rejected, (state, action) => {
				state.error = action.error.message;
				state.isLoading = false;
			})
			.addCase(signUp.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(signUp.fulfilled, (state, action) => {
				state.data = action.payload.user;
				state.isAuth = true;
				state.isLoading = false;
				state.error = null;
			})
			.addCase(signUp.rejected, (state, action) => {
				state.error = action.error.message;
				state.isLoading = false;
			})
			.addCase(fetchMe.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(fetchMe.fulfilled, (state, action) => {
				state.data = action.payload.user;
				state.isAuth = true;
				state.isLoading = false;
			})
			.addCase(fetchMe.rejected, (state, action) => {
				state.error = action.error.message;
				state.isLoading = false;
			})
			.addCase(logout.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(logout.fulfilled, (state, action) => {
				state.data = null;
				state.isAuth = false;
				state.isLoading = false;
			})
			.addCase(logout.rejected, (state, action) => {
				state.error = action.error.message;
				state.isLoading = false;
			});
	},
});

const { reducer: authReducer, actions } = authSlice;

export default authReducer;
