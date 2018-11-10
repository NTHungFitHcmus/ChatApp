import { combineReducers } from 'redux'
import { firebaseReducer } from 'react-redux-firebase'
import authReducer from './authReducer'
import userReducer from './userReducer'
import messReducer from './messReducer'

// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  auth: authReducer,
	user: userReducer,
	mess: messReducer
})

export default rootReducer;