import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import firebase from 'firebase';
import {addMess} from '../actions/mess';

const mapStateToProps = (state) => {
	console.log('ChatList state ');
	console.log(state);
	return {
		auth: state.auth,
		mess: state.mess
	}
}

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
		console.log('didmount');
		this.scrollToBottom();
		this._firebaseRef = firebase.database().ref(`messages`);
		this._firebaseRef.on('child_changed', (snapshot) => {
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
		
		if (this.props.withId){
			console.log('messList');
			let listmess = this.showList(this.props.mess).filter(item => item.uid === this.props.withId);
			console.log(listmess);
			if (listmess.length !== 0) {listmess = listmess[0].messPayload;}
			console.log(this.showList(listmess));
			const showMess = this.showList(listmess).map(mess => { 
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

export default connect(mapStateToProps)(ChatList);