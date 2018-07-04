import { combineReducers } from 'redux';
import apiReducer from './apiReducer';
import uiReducer from './uiReducer';
export default combineReducers({
	api: apiReducer,
	ui: uiReducer
});
