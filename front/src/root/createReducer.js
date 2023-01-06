import { combineReducers } from 'redux';

import { reducers } from './reducers';

export default function createReducer(asyncReducers) {
	return combineReducers({
		...reducers,
		...asyncReducers,
	});
}
