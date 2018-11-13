import React, { Component } from 'react';
import { firebaseConnect, isLoaded, isEmpty, getVal } from 'react-redux-firebase';
import { compose } from 'redux';
import {chooseUser} from '../actions/mess';
import {connect} from 'react-redux';
import {isLoad} from '../actions/mess';

class ChatHeader extends Component {
	constructor(props){
    super(props);
  };
	
	componentWillReceiveProps(nextProps) {
		if (!isLoaded(nextProps.user)) {
			console.log('loadingUser');
			const {dispatch} = this.props;
			//dispatch(isLoad(false));
		}
		else {
			if (isEmpty(nextProps.user))
				console.log('emptyUser');
			else {
				console.log('chooseUser');
				const {dispatch} = this.props;	
				const chosenUser = {
					uid: this.props.withUser,
					avatar: nextProps.user.photoURL,
					withUser: nextProps.user.displayName
				}
				//dispatch(chooseUser(chosenUser));
				//dispatch(isLoad(true));
			}
		}
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
  };
	
	handleClick()
	{
		const {dispatch} = this.props;
		this.props.firebase.push(`stars/${this.props.auth.uid}`, {userID: this.props.withUid});
		const chosenUser = {
					uid: this.props.user.withUid,
					avatar: this.props.user.avatarUrl,
					withUser: this.props.user.displayName,
					starUser: this.props.listAllStar
				}
				dispatch(chooseUser(chosenUser));
	};
	
	render() {
			if (this.props.withUid) {
				console.log(this.props.withUid)
			console.log(this.props.user)
			const listStar = (this.props.mess.starUser === undefined)
												? []
												: this.showList(this.showList(this.props.mess.starUser)[0]);
			console.log('listStar')	
			console.log(this.showList(this.props.mess.starUser));
			let isStar = false;
			listStar.map(star => { 
				console.log('star')
				if (star.userID !== undefined)
					if (star.userID.search(this.props.withUid) === 0) isStar = true;
			})
			const Avatar = (this.props.user) ? <img className='avatar' src={`${this.props.user.avatarUrl}`} alt='avatar' /> : <div></div>;
			const ChatWith = (this.props.user) ? <div className='chat-with'>Chat with {this.props.user.displayName}</div> : <div></div>;
			return (
				<div className='chat-header clearfix'>				
					{Avatar}
					<div className='chat-about'>
						{ChatWith}
					</div>
					{(this.props.mess.starUser === undefined || isStar === false) ? <div className='fa fa-star' ><button className='' onClick = {this.handleClick.bind(this)}> Star </button></div> 
					: ''}
					<i className='fa fa-star'></i>
				</div>
			);
		}
		else return (<div className='chat-header clearfix'>	</div>);
	}
}

export default compose(
		firebaseConnect((props) => ([
    `/users/${props.withUid}`
  ])),
		connect((state, props) => ({
			auth: state.firebase.auth,
			user: getVal(state.firebase.data, `/users/${props.withUid}`),
			mess: state.mess
    }))
	)(ChatHeader);