import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';
import {firebase} from '../firebase/firebase';
import { getFirebase, reactReduxFirebase } from 'react-redux-firebase'

const config = {
  userProfile: 'users', // firebase root where user profiles are stored
  enableLogging: false, // enable/disable Firebase's database logging
}

// Add redux Firebase to compose
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, config),
  applyMiddleware(thunk.withExtraArgument(getFirebase))
)(createStore)

const rootReducer = createStoreWithFirebase(
	reducers//,
	// applyMiddleware(thunk)
);

export default rootReducer;