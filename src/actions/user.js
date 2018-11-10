import {firebase, googleAuthProvider} from '../firebase/firebase';
import {ADD_USER} from './type';

export const addUser = (data) => ({
	type: ADD_USER,
	uid: data.uid,
	userPayload: data.userPayload
});