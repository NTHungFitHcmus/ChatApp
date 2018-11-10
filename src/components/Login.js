import React, { Component } from 'react';
import {connect} from 'react-redux';
import {firebaseLogin} from '../actions/auth';
import firebase from 'firebase';
import {login, logout} from '../actions/auth';
import '../App.css';

const mapStateToProps = (state) => {
	console.log('login state ');
	console.log(state);
	return {
		auth: state.auth
	}
}

class Login extends Component {
	constructor(props){
    super(props)
  };
	
	componentWillUpdate(nextProps) {
    if (nextProps.auth) {
			const {history} = this.props;
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
					<button className = 'BtnLogin' onClick = {this.handleClick.bind(this)}> Join us </button>
				</div>
			</div>
		);
	}
};

export default connect(mapStateToProps)(Login);