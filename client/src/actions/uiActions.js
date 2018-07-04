import { TOGGLE_SIDEBAR } from './types';

export const toggleSidebar = () => dispatch => {
	dispatch({
		type: TOGGLE_SIDEBAR
	})
}