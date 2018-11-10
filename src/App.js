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

export const history = createHistory();

class App extends Component {
	componentWillMount() {
		const {dispatch} = this.props; 
    dispatch(fetchUser());
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



export default connect()(App);
