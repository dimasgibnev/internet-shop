import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { orderService } from '../../services/orderService';
import { clearCart } from './userSlice';

export const createOrder = createAsyncThunk(
	'order/createOrder',
	async (args, { rejectWithValue, dispatch }) => {
		try {
			const data = await orderService.createOrder(args);

			dispatch(clearCart());
			return data;
		} catch (error) {
			if (!error.response) {
				throw error;
			}
			rejectWithValue(error.response.data);
		}
	},
);

export const getOrder = createAsyncThunk(
	'order/getOrder',
	async (orderId, { rejectWithValue }) => {
		try {
			const { order } = await orderService.getOrder(orderId);

			return order;
		} catch (error) {
			if (!error.response) {
				throw error;
			}
			rejectWithValue(error.response.data);
		}
	},
);

export const getOrders = createAsyncThunk(
	'order/getOrders',
	async (_, { rejectWithValue }) => {
		try {
			const data = await orderService.getOrders();

			return data;
		} catch (error) {
			if (!error.response) {
				throw error;
			}
			rejectWithValue(error.response.data);
		}
	},
);

export const deleteOrder = createAsyncThunk(
	'order/deleteOrder',
	async (orderId, { rejectWithValue }) => {
		try {
			const data = await orderService.deleteOrder(orderId);

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
	order: null,
};

export const orderSlice = createSlice({
	name: 'order',
	initialState,
	reducers: {
		setOrders: (state, action) => {
			state.data = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(createOrder.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(createOrder.fulfilled, (state, action) => {
				state.isLoading = false;
			})
			.addCase(createOrder.rejected, (state, action) => {})
			.addCase(getOrders.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getOrders.fulfilled, (state, action) => {
				state.data = action.payload.orders;

				state.isLoading = false;
			})
			.addCase(getOrders.rejected, (state, action) => {})
			.addCase(getOrder.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getOrder.fulfilled, (state, action) => {
				state.order = action.payload;

				state.isLoading = false;
			})
			.addCase(getOrder.rejected, (state, action) => {})
			.addCase(deleteOrder.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(deleteOrder.fulfilled, (state, action) => {
				state.order = action.payload;

				state.isLoading = false;
			})
			.addCase(deleteOrder.rejected, (state, action) => {});
	},
});

export const selectOrders = (state) => state.order.data;

export const { setOrders } = orderSlice.actions;

export default orderSlice.reducer;
