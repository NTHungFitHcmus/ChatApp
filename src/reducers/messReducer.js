import {CHANGE_MESS, CLEAR_MESS, CHOOSE_USER, SEND_MESS, ADD_MESS, LOAD_USER} from '../actions/type';

export default (state = {txt: ''}, action) => {
	switch (action.type) {
		case CHANGE_MESS:
			return {
				...state,
				txt: action.txt
			};
		case CLEAR_MESS:
			return {
				...state,
				txt: ''
			};
		case CHOOSE_USER:
			return {
				...state,
				uid: action.uid,
				avatar: action.avatar,
				withUser: action.withUser
			};
		case ADD_MESS:
			return {
				...state,
				[action.uid]: {
					messPayload: action.messPayload
				}
			};
		case SEND_MESS:
			return {
				...state,
				isSend: action.isSend
			};
		case LOAD_USER:
			return {
				...state,
				loaded: action.loaded 
			};
		default:
			return state;
	}
}