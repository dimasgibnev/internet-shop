import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { RootState } from '../store';
import { IOrder } from '../../interface/order.interface';
import { orderService } from '../../services/orderService';
import { clearCart } from './userSlice';

interface IOrderState {
	isLoading: boolean;
	data: { order: IOrder }[] | null;
	error: string | undefined;
}

type Typeorder = {
	products: {
		product: string;
	}[];
};

export const createOrder = createAsyncThunk(
	'order/createOrder',
	async (
		args: Typeorder,
		{ rejectWithValue, dispatch },
	): Promise<IOrderState | any> => {
		try {
			const data = await orderService.createOrder(args);

			dispatch(clearCart());
			return data;
		} catch (error: Error | AxiosError | any) {
			if (!error.response) {
				throw error;
			}
			rejectWithValue(error.response.data);
		}
	},
);

export const getOrders = createAsyncThunk(
	'order/getOrders',
	async (_, { rejectWithValue, dispatch }) => {
		try {
			const data = await orderService.getOrders();


			return data
		} catch (error: Error | AxiosError | any) {
			if (!error.response) {
				throw error;
			}
			rejectWithValue(error.response.data);
		}
	},
);

const initialState: IOrderState = {
	isLoading: false,
	data: null,
	error: '',
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
				state.data?.push(action.payload.order);
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
			.addCase(getOrders.rejected, (state, action) => {});
	},
});

export const selectOrders = (state: RootState) => state.order.data;

export const { setOrders } = orderSlice.actions;

export default orderSlice.reducer;
