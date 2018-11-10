import {ADD_USER} from '../actions/type';

export default (state = {}, action) => {
	switch (action.type){
		case ADD_USER:
			return {
				...state,
				[action.uid]: {
					userPayload: action.userPayload
				}
			};
		default:
			return state;
	}
}