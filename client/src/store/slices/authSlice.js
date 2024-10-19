import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import authService from '../../services/authService';
import { setUser } from './userSlice';

export const signIn = createAsyncThunk(
	'auth/signIn',
	async (args, { rejectWithValue, dispatch }) => {
		try {

			const { user } = await authService.signIn(args);

			dispatch(setUser(user));

			return user;
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
	async (args, { rejectWithValue, dispatch }) => {
		try {
			const { user } = await authService.signUp(args);
			dispatch(setUser(user));

			return user;
		} catch (error) {
			if (!error.response) {
				throw error;
			}

			rejectWithValue(error.response.data);
		}
	},
);
export const fetchMe = createAsyncThunk('auth/fetchMe', async (_, { dispatch }) => {
	const { user } = await authService.fetchMe();
	dispatch(setUser(user));

	return user;
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
	reducers: {
		clearError: (state) => {
			state.error = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(signIn.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(signIn.fulfilled, (state, action) => {
				state.data = action.payload;
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
				state.data = action.payload;
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
				state.data = action.payload;
				state.isAuth = true;
				state.isLoading = false;
			})
			.addCase(fetchMe.rejected, (state, action) => {
				state.error = action.error.message;
				state.isLoading = false;
			});
	},
});

export const selectUser = (state) => state.auth.data;

export const selectIsAuth = (state) => state.auth.isAuth;

export const {clearError} = authSlice.actions

export default authSlice.reducer;
