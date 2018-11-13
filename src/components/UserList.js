import React, { Component } from 'react';
import {connect} from 'react-redux';
import { firebaseConnect, isLoaded, isEmpty, getVal } from 'react-redux-firebase';
import { compose } from 'redux';
import {doMess, clearMess, chooseUser, sendMess, addMess, doSearch} from '../actions/mess';

class UserList extends Component {
	constructor(props){
    super(props);
  };
	
	componentDidMount(){
		
  };
	
	componentWillReceiveProps(nextProps) {
		if (!isLoaded(nextProps.stars))
			console.log('loadingStars');
		else {
			if (isEmpty(nextProps.stars))
				console.log('emptyStars');
			else {
				console.log(nextProps.stars);
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
  }	
	
	handleChooseUser(uid) {
		const {dispatch} = this.props;	
		const chosenUser = {
			uid: uid,
			avatar: '',//snapshot.child("photoURL").val(),
			withUser: '',//snapshot.child("displayName").val()
			starUser: this.props.stars
		}
		dispatch(chooseUser(chosenUser));
	};
	
  render() {
		console.log(this.props.stars);
		const listUserTemp = this.showList(this.props.userList).sort(function(a, b) {
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
		//console.log(listUserTemp);
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
    
		return (			
			<ul className='list'>
			{listUser} 
			</ul>
		);
	}
};

export default compose(
		firebaseConnect((props) => ([
			`/stars/${props.uidAuth}`
		])),
		connect((state, props) => ({
			auth: state.firebase.auth,
			stars: state.firebase.data.stars,
			mess: state.mess
    }))
	)(UserList);