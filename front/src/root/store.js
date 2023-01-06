import { createWrapper } from 'next-redux-wrapper';

import { applyMiddleware, createStore, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { routinePromiseWatcherSaga } from 'redux-saga-routines';
import { createRouterMiddleware, initialRouterState } from 'connected-next-router';
import Router from 'next/router';

import reducers from './reducers';

import sessionSaga from '../modules/session/saga';

let store;

const makeStore = (context, initialState) => {
	const sagaMiddleware = createSagaMiddleware();
	const middlewares = [sagaMiddleware, createRouterMiddleware()];

	const composeEnhancers = process.env.NODE_ENV !== 'production'
		&& typeof window === 'object'
		&& window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
		? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
			shouldHotReload: false,
		})
		: compose;

	const { asPath } = context.ctx || Router.router || {};


	if (asPath) {
		initialState = {
			...(initialState || {}),
			router: initialRouterState(asPath),
		};
	}

	store = createStore(reducers, initialState, composeEnhancers(applyMiddleware(...middlewares)));

	store.runSaga = sagaMiddleware.run;
	store.injectedReducers = {};
	store.injectedSagas = {};

	store.runSaga(routinePromiseWatcherSaga);
	store.runSaga(sessionSaga);

	return store;
};

// export an assembled wrapper
export const wrapper = createWrapper(makeStore, { debug: true });

export { store };
