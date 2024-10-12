import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import filterReducer from './slices/filterSlice';
import categoryReducer from './slices/categorySlice';
import productsReducer from './slices/productsSlice';
import userReducer from './slices/userSlice';
import ratingReducer from './slices/reviewSlice';
import orderReducer from './slices/orderSlice';

export const store = configureStore({
	reducer: {
		auth: authReducer,
		products: productsReducer,
		user: userReducer,
		category: categoryReducer,
		filter: filterReducer,
		review: ratingReducer,
		order: orderReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
