import Router from 'next/router';
import {
	takeEvery, put, fork, cancel,
} from 'redux-saga/effects';

import api from 'root/services/api';
import APP_URLS from 'root/appUrls';
import {
	LOGGED_IN, LOGOUT, TOKEN_FETCHED,
} from 'root/actions';

import wsSessionSaga from './wsSessionSaga';

export default function* sessionSaga() {
	let wsSagaTask = yield fork(wsSessionSaga);

	yield takeEvery(LOGGED_IN, function* loggedIn({ user }) {
		console.log('logged in saga! ', user);
		if (!wsSagaTask) {
			wsSagaTask = yield fork(wsSessionSaga);
		}

		user.expires_at = Date.now() + (user.expires_in * 1000);

		yield put({ type: TOKEN_FETCHED, user });
		console.log('Routing to ', APP_URLS.HOME.path);

		Router.replace(APP_URLS.HOME.path);
	});

	yield takeEvery(TOKEN_FETCHED, function* loggedIn({ user }) {
		api.setJwtToken(user.access_token);
		localStorage.setItem('user', JSON.stringify(user));
	});

	yield takeEvery(LOGOUT, function* loggedIn({ automatic }) {
		console.log('logging out in automatic mode: ', automatic);
		if (wsSagaTask) {
			yield cancel(wsSagaTask);
			wsSagaTask = null;
		}

		api.setJwtToken(null);
		localStorage.removeItem('user');

		Router.replace(APP_URLS.LANDING.path);
	});
}
