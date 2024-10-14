import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	sort: {
		name: 'Новизне',
		sort: 'createdAt',
		order: 'desc',
	},
	page: 1,
	line: '',
	category: '',
	search: '',
};
const filterSlice = createSlice({
	name: 'filter',
	initialState,
	reducers: {
		setSort: (state, action) => {
			state.sort = action.payload;
		},
		setPage: (state, action) => {
			state.page = action.payload;
		},
		setLine: (state, action) => {
			state.line = action.payload;
		},
		setCategory: (state, action) => {
			state.category = action.payload;
		},
		setSearch: (state, action) => {
			state.search = action.payload;
		},
		setFilter: (state, action) => {
			state = action.payload;
		},
		updateFilter: (state, action) => {
			state = { ...state, ...action.payload };
		},
		resetFilter: () => initialState,
	},
});

export default filterSlice.reducer;

export const selectSort = (state) => state.filter.sort;

export const selectPage = (state) => state.filter.page;

export const selectLine = (state) => state.filter.line;

export const selectCategory = (state) => state.filter.category;

export const selectSearch = (state) => state.filter.search;

export const selectFilter = (state) => {
	return {
		sort: selectSort(state),
		page: selectPage(state),
		line: selectLine(state),
		category: selectCategory(state),
		search: selectSearch(state),
	};
};

export const {
	setSort,
	setPage,
	setLine,
	setCategory,
	setSearch,
	resetFilter,
	setFilter,
	updateFilter
} = filterSlice.actions;
