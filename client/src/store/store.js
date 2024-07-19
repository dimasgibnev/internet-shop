import { combineReducers, createStore } from 'redux';
import { userReducer } from './reducers/userReducer';

const reducer = combineReducers({
	user: userReducer,
});
export const store = createStore(reducer);

