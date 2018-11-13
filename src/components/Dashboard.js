import React, { Component } from 'react';
import {connect} from 'react-redux';
import {firebaseLogout, logout} from '../actions/auth';
import firebase from 'firebase';
import '../css/chat.css';
import {addUser} from '../actions/user';
import {doMess, clearMess, chooseUser, sendMess, addMess, doSearch} from '../actions/mess';
import ChatHeader from './ChatHeader';
import ChatList from './ChatList';
import UserList from './UserList';
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
		this.props.firebase.logout();
		const time = firebase.database.ServerValue.TIMESTAMP;
		this.props.firebase.update(`users/${this.props.auth.uid}`, {logOut: true, timeOut: time})
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
	
	handleChangeSearch(e){
		const {dispatch} = this.props;	  
		dispatch(doSearch(e.target.value));
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
		const listUserTemp = this.showList(this.props.user).sort(function(a, b) {
			const isOffA = a.logOut;
			const isOffB = b.logOut;
			if (isOffA === false && isOffB === true)	{
				return -1;
			}
			if (isOffA === true && isOffB === false)	{
				return 1;
			}
			
			const nameA = a.displayName;
			const nameB = b.displayName;
			if (nameA < nameB) {
				return -1;
			}
			if (nameA > nameB) {
				return 1;
			}
			
			return 0;
		});
		console.log(listUserTemp);
		const listUser = listUserTemp.map(user => { 
			if ((user.uid !== this.props.auth.uid) && (user.uid !== 'undefined') && (user.displayName.search(this.props.mess.txtSearch) >= 0)) return (
				<li className='clearfix' key={user.uid} onClick = {this.handleChooseUser.bind(this, user.uid)}>
					<img className='avatar' src={`${user.avatarUrl}`}/>
					<div className='about'>
						<div className='name'>{user.displayName}</div>
						<div className='status'>
							{user.logOut ? <i className='offline'> offline({new Date(user.timeOut).getHours()} : {new Date(user.timeOut).getMinutes()} / {new Date(user.timeOut).getDate()}-{new Date(user.timeOut).getMonth()}-{new Date(user.timeOut).getFullYear()})</i> : <i className='online'> online</i>}
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
						<div className="search">
							<input type="text" placeholder="search" onChange={this.handleChangeSearch.bind(this)} value={this.props.mess.txtSearch} />
							<i className="fa fa-search"></i>
						</div>
						<UserList uidAuth={this.props.auth.uid} userList={this.props.user}/>
					</div>
					<div className='chat'>		
						<ChatHeader withUid={this.props.mess.uid} listAllStar={this.props.mess.starUser}/>
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
			{ path: '/users' }
		]),
		connect((state) => ({
			auth: state.firebase.auth,
			user: state.firebase.data.users,
			mess: state.mess
    }))
	)(Dashboard);