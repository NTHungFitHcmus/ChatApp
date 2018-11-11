import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import firebase from 'firebase';
import {BrowserRouter as Router, Route,  Link} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import {connect} from 'react-redux';
import {fetchUser} from './actions/auth';
import requireAuth from "./components/auth/requireAuth";
import { firebaseConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import config from './store';

export const history = createHistory();

class App extends Component {
	componentWillMount() {
		const {dispatch} = this.props; 
    //dispatch(fetchUser());
		// config.onAuthStateChanged(user => {
			// if (user) {
				// this.props.set(`users/${ user.uid }`,{
					// displayName: user.displayName,
					// photoURL: user.photoURL,
					// email: user.email,
					// lastTimeLoggedIn: firebase.database.ServerValue.TIMESTAMP
				// });
		// }});
		console.log(this.props.auth)
		console.log('check');
  }
	
  render() {
    return (		
				<Router>
					<div>
						<Route exact path="/" component={Login} />
						<Route exact path="/dashboard" component={requireAuth(Dashboard)} />
					</div>
				</Router>
    );
  }
}



export default compose(firebaseConnect(),connect((state) => ({
auth: state.firebase.auth})))(App);
