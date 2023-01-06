import {
	takeEvery, fork, take, cancel, delay, select, cancelled,
} from 'redux-saga/effects';

import { store } from 'root/store';

import { TOKEN_FETCHED } from 'root/actions';

let wsSaga;

function* openSession(token) {
	const sockets = {};
	let socketCounter = 0;

	function setWebSocket(counter) {
		const webSocket = new WebSocket(`${process.env.WS}://${process.env.API_ENDPOINT}/ws/session?access_token=${token}`);
		webSocket.onmessage = (msg) => {
			const data = JSON.parse(msg.data);
			if (data.type === 'PONG') {
				console.log('setting timeout for ping ', counter);
				setTimeout(() => webSocket.send(JSON.stringify({ type: 'PING' })), 60000);
			} else {
				store.dispatch({ type: 'ON_MESSAGE', payload: data });
			}
		};

		webSocket.onclose = () => {
			const socket = sockets[counter];
			console.log('On socket closed ', !!socket);
			if (socket) {
				store.dispatch({ type: 'ON_SOCKET_CLOSED', socket: counter });
			}
		};
		webSocket.onerror = (args) => {
			console.log('socket error ', args);
			if (sockets[counter]) {
				store.dispatch({ type: 'ON_SOCKET_ERROR', socket: counter });
			}
		};

		setTimeout(() => webSocket.send(JSON.stringify({ type: 'PING' })), 5000);
		return webSocket;
	}

	sockets[++socketCounter] = setWebSocket(socketCounter);

	try {
		while (true) {
			const nextAction = yield take(['ON_SOCKET_CLOSED', 'ON_SOCKET_ERROR']);
			console.log('Next from ws saga ', nextAction);
			if (nextAction.type === 'ON_SOCKET_CLOSED') {
				if (yield select(({ session }) => session?.token)) {
					if (sockets[nextAction.socket]) {
						yield delay(5000);
						delete sockets[nextAction.socket];
						sockets[++socketCounter] = setWebSocket(socketCounter);
					}
				}
			}
		}
	} finally {
		if (yield cancelled()) {
			console.log('WS saga cancelled');
			const socket = sockets[socketCounter];
			if (socket) {
				delete sockets[socketCounter];
				socket.close(3000);
			}
		}
	}
}

function* forkSaga() {
	const user = yield select(({ session  }) => session?.user);
	if (user) {
		if (wsSaga) {
			console.log('Cancelling previous ws saga');
			yield cancel(wsSaga);
		}
		wsSaga = yield fork(openSession, user.access_token);
	}
}

export default function* webSocketSaga() {
	yield takeEvery(TOKEN_FETCHED, forkSaga);
}
