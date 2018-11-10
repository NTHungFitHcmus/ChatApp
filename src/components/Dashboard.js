import React, { Component } from 'react';
import {connect} from 'react-redux';
import {firebaseLogout, logout} from '../actions/auth';
import firebase from 'firebase';
import '../css/chat.css';
import {addUser} from '../actions/user';
import {doMess, clearMess, chooseUser, sendMess, addMess} from '../actions/mess';
import ChatHeader from './ChatHeader';
import ChatList from './ChatList';

const mapStateToProps = (state) => {
	console.log('dashboard state ');
	console.log(state);
	return {
		auth: state.auth,
		user: state.user,
		mess: state.mess
	}
}

class Dashboard extends Component {
	constructor(props){
    super(props);
  };
	
	componentDidMount(){
		firebase.database().ref('users').on('child_added', (snapshot) => {
			const {dispatch} = this.props;
			const newUser = {
				uid: snapshot.key,
				userPayload: snapshot.val()
			};
			dispatch(addUser(newUser));
		});
		firebase.database().ref('messages').on('child_added', (snapshot) => {
			const {dispatch} = this.props;
			console.log(snapshot.key);
			const { uid, displayName, message } = snapshot.val();
			console.log(snapshot.child(`${this.props.auth.uid}`).exists());
			console.log(snapshot.child(`${this.props.auth.uid}`).key);
			console.log(snapshot.val());
			const newMess = {
				uid: snapshot.key,
				messPayload: snapshot.child(`${this.props.auth.uid}`).val()
			};
			console.log(newMess);
			dispatch(addMess(newMess));
		});
  };
	
	componentWillUpdate(){
	}
	showList(items) {
    if(!items) {
      return [];
    }
    return Object.keys(items).reduce(
      (list, uid) => {
				return [
					...list,
					{
						uid,
						...items[uid]
					}
				];
			},
			[]
		);
  }
	
	handleClick()
	{
		const {dispatch} = this.props;
		console.log(this.props.auth);
		dispatch(firebaseLogout());
		//dispatch(logout());
		console.log('logout');
	};
	
	handleSendMess() {
		const {dispatch} = this.props;	  
		dispatch(sendMess());
		
		firebase.database().ref(`messages`).on('child_added', (snapshot) => {
			const {dispatch} = this.props;
			console.log(snapshot.key);
			const { uid, displayName, message } = snapshot.val();
			console.log(snapshot.child(`${this.props.auth.uid}`).exists());
			console.log(snapshot.child(`${this.props.auth.uid}`).key);
			console.log(snapshot.val());
			const newMess = {
				uid: snapshot.key,
				messPayload: snapshot.child(`${this.props.auth.uid}`).val()
			};
			console.log(newMess);
			dispatch(addMess(newMess));
		});
		dispatch(clearMess());
	};
	
	handleChangeMess(e){
		const {dispatch} = this.props;	  
		dispatch(doMess(e.target.value));
  };
	
	handleChooseUser(uid) {
		const ref = firebase.database().ref(`users/${uid}`);
		ref.once("value")
			.then(snapshot => {
				console.log(snapshot.child("displayName").val());
				const {dispatch} = this.props;	
				const chosenUser = {
					uid: uid,
					avatar: snapshot.child("photoURL").val(),
					withUser: snapshot.child("displayName").val()
				}
				dispatch(chooseUser(chosenUser));
			});
	};
	
  render() {
		const listUser = this.showList(this.props.user).map(user => { 
			if (user.uid !== this.props.auth.uid) return (
				<li className='clearfix' key={user.uid} onClick = {this.handleChooseUser.bind(this, user.uid)}>
					<img className='avatar' src={`${user.userPayload.photoURL}`}/>
					<div className='about'>
						<div className='name'>{user.userPayload.displayName}</div>
						<div className='status'>
							<i className='online'> online</i>
						</div>
					</div>
				</li>
			);
		});
		
		return (
			<div className=''>
			
				<div className='HeadNav'> 
					<img className='avatar' src={`${this.props.auth.photoURL}`}/> 
					<div className='WelcomeTitle'>
						Xin chào {this.props.auth.displayName}!
					</div>
					<button className='BtnLogout' onClick = {this.handleClick.bind(this)}> Logout </button>
				</div>
				
				<div className='container clearfix'>
					<div className='people-list'>
						<ul className='list'>
						{listUser} 
						</ul>
					</div>
					<div className='chat'>		
						<ChatHeader avatar={this.props.mess.avatar} withUser={this.props.mess.withUser}/>
						<ChatList withId={this.props.mess.uid} messa={this.props.mess}/>      
						<div className='chat-message clearfix'>
							<textarea className='textareaMessage' name='message-to-send' id='message-to-send' placeholder ='Type your message' rows='3' onChange={this.handleChangeMess.bind(this)} value={this.props.mess.txt}></textarea>
																		
							<button className='buttonMessage' onClick = {this.handleSendMess.bind(this)}>Send</button>

						</div>						
					</div>					
				</div>
			</div>
		);
	}
};

export default connect(mapStateToProps)(Dashboard);