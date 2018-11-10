import {CHANGE_MESS, CLEAR_MESS, CHOOSE_USER, SEND_MESS, ADD_MESS} from './type';
import {firebase} from '../firebase/firebase';

export const doMess = (txt) => ({
	type: CHANGE_MESS,
	txt: txt
});

export const clearMess = () => ({
	type: CLEAR_MESS
});

export const chooseUser = (data) => ({
	type: CHOOSE_USER,
	uid: data.uid,
	avatar: data.avatar,
	withUser: data.withUser
});

export const sendMess = () => (dispatch, getState) => {
	const time = firebase.database.ServerValue.TIMESTAMP;
	
	const newPost1 = firebase.database().ref(`messages/${getState().auth.uid}/${getState().mess.uid}`).push();
	newPost1.set({
		uid: getState().auth.uid,
		displayName:getState().auth.displayName,
		message: getState().mess.txt,
		createdAt: time
	});
	
	const newPost2 = firebase.database().ref(`messages/${getState().mess.uid}/${getState().auth.uid}`).push();
	newPost2.set({
		uid: getState().auth.uid,
		displayName: getState().auth.displayName,
		message: getState().mess.txt,
		createdAt: time
	});
	
	dispatch({
		type: SEND_MESS,
		isSend: true
	});
};

export const addMess = (data) => ({
	type: ADD_MESS,
	uid: data.uid,
	messPayload: data.messPayload
});