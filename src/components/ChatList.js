import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import firebase from 'firebase';
import {addMess} from '../actions/mess';
import { firebaseConnect, isLoaded, isEmpty, getVal } from 'react-redux-firebase';
import { compose } from 'redux';
import {chooseUser} from '../actions/mess';

// const mapStateToProps = (state) => {
	// console.log('ChatList state ');
	// console.log(state);
	// return {
		// auth: state.auth,
		// mess: state.mess
	// }
// }

class ChatList extends Component {
	constructor(props){
    super(props);
  };
	
	messagesEnd = document.getElementById("chatHistory");
	
	scrollToBottom = () => {
		this.messagesEnd = document.getElementById("chatHistory");
		if (this.messagesEnd) this.messagesEnd.scrollTop = this.messagesEnd.scrollHeight;
	};

	componentDidMount(){
		// console.log('didmount');
		this.scrollToBottom();
		// this._firebaseRef = firebase.database().ref(`messages`);
		// this._firebaseRef.on('child_changed', (snapshot) => {
			const {dispatch} = this.props;
			
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
	
	componentWillReceiveProps(nextProps) {
		if (!isLoaded(nextProps.messages))
			console.log('loadingMessages');
		else {
			if (isEmpty(nextProps.messages))
				console.log('emptyMessages');
			else {
				console.log(nextProps.messages);
			}
		}
	}
	
	componentDidUpdate() {
		this.scrollToBottom();
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
	
	render() {	
		console.log(this.props.mess.uid);	
		if (this.props.mess.uid){
			console.log(this.props.uidAuth);
			console.log(this.props.withId);
			console.log('messList');
			console.log(this.props.messages);
			let listmess = this.showList(this.showList(this.props.messages)[0]).filter(item => item.uid === this.props.withId);
			console.log(listmess);
			//if (listmess.length !== 0) {listmess = listmess[0].messPayload;}
			console.log(this.showList(listmess[0]));
			const showMess = this.showList(listmess[0]).map(mess => { 
				//console.log(mess);
				if (mess.uid === this.props.auth.uid)
					return (
					<li className='clearfix'>
						<div className='message-data align-right'>
							<span className='message-data-time' ></span> &nbsp; &nbsp;
							<span className='message-data-name' >{mess.displayName}</span> <i className='fa fa-circle me'></i>										
						</div>
						<div className='message other-message float-right'>
							{mess.message}
						</div>
					</li>
					);
				else
					if (mess.uid !== 'uid')
						return (
							<li>
								<div className='message-data'>
									<span className='message-data-name'><i className='fa fa-circle online'></i> {mess.displayName}</span>
									<span className='message-data-time'></span>
								</div>
								<div className='message my-message'>
									{mess.message}
								</div>
							</li>
						);
			});
						
			return (
				<div id='chatHistory' className='chat-history'>
					<ul >		
						{showMess}
					</ul>       
				</div>
		);}else {return (<div className='chat-history'></div>)}
	}
}

export default compose(
		firebaseConnect((props) => ([
			`/messages/${props.uidAuth}`
		])),
		connect((state, props) => ({
			auth: state.firebase.auth,
			messages: state.firebase.data.messages,
			mess: state.mess
    }))
	)(ChatList);