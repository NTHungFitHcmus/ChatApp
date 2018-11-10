import {firebase, googleAuthProvider} from '../firebase/firebase';
import {LOGIN, LOGOUT, FETCH_USER} from './type';

export const login = (data) => ({
	type: LOGIN,
	id: data.id,
	name: data.name
});

export const logout = () => ({
	type: LOGOUT
});

export const firebaseLogin = () => {
	return () => {
		return firebase.auth().signInWithPopup(googleAuthProvider);
	};
};

export const firebaseLogout = () => {
	return () => {
		return firebase.auth().signOut();
	};
};

export const fetchUser = () => dispatch => {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
			firebase.database().ref(`users/${ user.uid }`).set({
				displayName: user.displayName,
				photoURL: user.photoURL,
				email: user.email,
				lastTimeLoggedIn: firebase.database.ServerValue.TIMESTAMP
      });
				
      dispatch({
        type: FETCH_USER,
        payload: user
      });
    } else {
      dispatch({
        type: FETCH_USER,
        payload: null
      });
    }
  });
};