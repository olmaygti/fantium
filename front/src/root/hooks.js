import React from 'react';
import { ReactReduxContext } from 'react-redux';

import createReducer from 'root/createReducer';

export const useWithBackendEvent = (...eventTypes) => {
	const context = React.useContext(ReactReduxContext);
	const [eventReceived, seteventReceived] = React.useState(false);
	React.useEffect(() => {
		const { store } = context;
		store.replaceReducer(createReducer({
			[`${eventTypes}_reducer`]: (state = { }, { type, payload }) => {
				if (type === 'ON_MESSAGE' && eventTypes.includes(payload.type)) {
					setTimeout(() => seteventReceived(payload));
				}
				return state;
			},
		}));
		return () => store.replaceReducer(createReducer());
	}, []);

	return eventReceived;
};
