import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import categoryReducer from './slices/categorySlice';
import productsReducer from './slices/productsSlice';
import userReducer from './slices/userSlice';

export const store = configureStore({
	reducer: {
		auth: authReducer,
		products: productsReducer,
		user: userReducer,
		category: categoryReducer,
	},
});
