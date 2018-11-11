import React, { Component } from 'react';
import {connect} from 'react-redux';
import {firebaseLogout, logout} from '../actions/auth';
import firebase from 'firebase';
import '../css/chat.css';
import {addUser} from '../actions/user';
import {doMess, clearMess, chooseUser, sendMess, addMess} from '../actions/mess';
import ChatHeader from './ChatHeader';
import ChatList from './ChatList';
import { firebaseConnect, isLoaded, isEmpty, getVal } from 'react-redux-firebase';
import { compose } from 'redux';

// const mapStateToProps = (state) => {
	// console.log('dashboard state ');
	// console.log(state);
	// return {
		// auth: state.auth,
		// user: state.user,
		// mess: state.mess
	// }
// }

class Dashboard extends Component {
	constructor(props){
    super(props);
  };
	
	componentDidMount(){
		// firebase.database().ref('users').on('child_added', (snapshot) => {
			// const {dispatch} = this.props;
			// const newUser = {
				// uid: snapshot.key,
				// userPayload: snapshot.val()
			// };
			// dispatch(addUser(newUser));
		// });
		// firebase.database().ref('messages').on('child_added', (snapshot) => {
			// const {dispatch} = this.props;
			// console.log(snapshot.key);
			// const { uid, displayName, message } = snapshot.val();
			// console.log(snapshot.child(`${this.props.auth.uid}`).exists());
			// console.log(snapshot.child(`${this.props.auth.uid}`).key);
			// console.log(snapshot.val());
			// const newMess = {
				// uid: snapshot.key,
				// messPayload: snapshot.child(`${this.props.auth.uid}`).val()
			// };
			// console.log(newMess);
			// dispatch(addMess(newMess));
		// });
  };
	
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
		this.props.firebase.logout()
		//dispatch(firebaseLogout());
		//dispatch(logout());
		console.log('logout');
	};
	
	handleSendMess() {
		const {dispatch} = this.props;	  
		//dispatch(sendMess());
		const time = firebase.database.ServerValue.TIMESTAMP;
		
		const newPost1 = {
			uid: this.props.auth.uid,
			displayName:this.props.auth.displayName,
			message: this.props.mess.txt,
			createdAt: time
		};
		this.props.firebase.push(`messages/${this.props.auth.uid}/${this.props.mess.uid}`, newPost1)
		
		const newPost2 = {
			uid: this.props.auth.uid,
			displayName: this.props.auth.displayName,
			message: this.props.mess.txt,
			createdAt: time
		};
		this.props.firebase.push(`messages/${this.props.mess.uid}/${this.props.auth.uid}`, newPost2)
		
		dispatch(clearMess());
	};
	
	handleChangeMess(e){
		const {dispatch} = this.props;	  
		dispatch(doMess(e.target.value));
  };
	
	handleChooseUser(uid) {
		// const ref = firebase.database().ref(`users/${uid}`);
		// ref.once("value")
			// .then(snapshot => {
				// console.log(snapshot.child("displayName").val());
				const {dispatch} = this.props;	
				const chosenUser = {
					uid: uid,
					avatar: '',//snapshot.child("photoURL").val(),
					withUser: ''//snapshot.child("displayName").val()
				}
				dispatch(chooseUser(chosenUser));
			// });
	};
	
  render() {
		const listUser = this.showList(this.props.user).map(user => { 
			if ((user.uid !== this.props.auth.uid) && (user.uid !== 'undefined')) return (
				<li className='clearfix' key={user.uid} onClick = {this.handleChooseUser.bind(this, user.uid)}>
					<img className='avatar' src={`${user.photoURL}`}/>
					<div className='about'>
						<div className='name'>{user.displayName}</div>
						<div className='status'>
							<i className='online'> online</i>
						</div>
					</div>
				</li>
			);
		});
		// <ChatHeader avatar={this.props.mess.avatar} withUser={this.props.mess.withUser}/>
						// <ChatList withId={this.props.mess.uid} messa={this.props.mess}/>     
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
						<ChatHeader withUid={this.props.mess.uid}/>
						<ChatList withId={this.props.mess.uid} uidAuth={this.props.auth.uid}/>  
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

export default compose(
		firebaseConnect([
			{ type:'child_added', path: '/users' }
		]),
		connect((state) => ({
			auth: state.firebase.auth,
			user: state.firebase.data.users,
			mess: state.mess
    }))
	)(Dashboard);