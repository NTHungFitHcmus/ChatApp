import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';

const rootReducer = createStore(
	reducers,
	applyMiddleware(thunk)
);

export default rootReducer;