import React, { Component } from 'react';
import {connect} from 'react-redux';
import {firebaseLogin} from '../actions/auth';
//import firebase from 'firebase';
import {login, logout} from '../actions/auth';
import '../App.css';
import { firebaseConnect, isLoaded, isEmpty, getVal } from 'react-redux-firebase';
import { compose } from 'redux';

// const mapStateToProps = (state) => {
	// console.log('login state ');
	// console.log(state);
	// return {
		// auth: state.auth
	// }
// }

class Login extends Component {
	constructor(props){
    super(props)
  };
	
	componentWillUpdate(nextProps) {
		const {history} = this.props;
		console.log('props');
		if (!isLoaded(nextProps.auth))
		 console.log('loadingAuth')
		else if (isEmpty(nextProps.auth))
			console.log('noAuth')
			else {
				this.props.firebase.update(`users/${nextProps.auth.uid}`, {logOut: false})
				history.push("/dashboard");
			}
			
  }
	
	handleClick()
	{
		const {history, dispatch} = this.props;
		dispatch(firebaseLogin());
		console.log('login');
	};
	
  render() {
		return (
			<div className='App'>
				<div className='ContainerLogin'>
					<div><img src={require('../images/Untitled.png')}/></div>
					<button className = 'BtnLogin' onClick = {() => this.props.firebase.login({ provider: 'google', type: 'popup' })}> Join us </button>
				</div>
			</div>
		);
	}
};

export default //connect(mapStateToProps)
	compose(
		firebaseConnect([
			{ type:'child_added', path: '/users' }
		]),
		connect((state) => ({
			auth: state.firebase.auth,
			todos: state.firebase.data.users
    }))
	)(Login);