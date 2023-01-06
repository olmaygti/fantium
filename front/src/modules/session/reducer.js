import { TOKEN_FETCHED, LOGOUT } from 'root/actions';

export default (state = { token: null }, action) => {
	switch (action.type) {
	case TOKEN_FETCHED:
		state = { ...state, user: action.user };
		break;
	
	case LOGOUT:
		state = {
			...state, user: null, token: null, serverDown: null,
		};
		break;
	}
	return state;
};
