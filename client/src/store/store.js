import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import productReducer from './productSlice';
import userReducer from './userSlice';

export const store = configureStore({
	reducer: {
		auth: authReducer,
		product: productReducer,
		user: userReducer,
	},
});
