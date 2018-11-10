import {LOGIN, LOGOUT, FETCH_USER} from '../actions/type';


export default (state = {}, action) => {
	switch (action.type){
		case LOGIN:
			return {
				...state,
				id: action.id,
				name: action.name
			};
		case LOGOUT:
			return {};
		case FETCH_USER:
			return action.payload || null;
		default:
			return state;
	}
}