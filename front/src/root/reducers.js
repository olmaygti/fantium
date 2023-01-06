import { combineReducers } from 'redux';
import { routerReducer } from 'connected-next-router';

import sessionReducer from 'modules/session/reducer';

export const reducers = {
	router: routerReducer,
	session: sessionReducer,
};

export default combineReducers(reducers);
