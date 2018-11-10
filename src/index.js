import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { compose, createStore } from 'redux';
import { reactReduxFirebase } from 'react-redux-firebase';
import firebase from 'firebase';
import rootReducer from './store';
import {Provider} from 'react-redux';

ReactDOM.render(
	<Provider store = {rootReducer}>
		<App />
	</Provider>,
	document.getElementById('root'));

serviceWorker.unregister();