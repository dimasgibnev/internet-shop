import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import authService from '../../services/authService';
import { IUser } from '../../interface/user.interface';
import { AxiosError } from 'axios';
import { RootState } from '../store';
import { setUser } from './userSlice';

interface IAuthState {
	data: IUser | null;
	isAuth: boolean;
	isLoading: boolean;
	error: Error | AxiosError | any;
}

export const signIn = createAsyncThunk(
	'auth/signIn',
	async (args, { rejectWithValue, dispatch }) => {
		try {

			const { user } = await authService.signIn(args);

			dispatch(setUser(user));

			return user;
		} catch (error: Error | AxiosError | any) {
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
		} catch (error: Error | AxiosError | any) {
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

const initialState: IAuthState = {
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
			.addCase(fetchMe.fulfilled, (state, action: { payload: IUser }) => {
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

export const selectUser = (state: RootState) => state.auth.data;

export const selectIsAuth = (state: RootState) => state.auth.isAuth;

export const {clearError} = authSlice.actions

export default authSlice.reducer;
