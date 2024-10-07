import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	sort: {
		name: 'популярности',
		value: 'totalRating',
	},
};
const filterSlice = createSlice({
	name: 'filter',
	initialState,
	reducers: {
		setSort: (state, action) => {
			state.sort = action.payload;
		},
	},
});

export default filterSlice.reducer;

export const { setSort } = filterSlice.actions;