import React, { Component } from 'react';

class ChatHeader extends Component {
	constructor(props){
    super(props);
  };
	
	render() {
		const Avatar = (this.props.avatar) ? <img className='avatar' src={`${this.props.avatar}`} alt='avatar' /> : <div></div>;
		const ChatWith = (this.props.withUser) ? <div className='chat-with'>Chat with {this.props.withUser}</div> : <div></div>;
		
		return (
			<div className='chat-header clearfix'>				
				{Avatar}
				<div className='chat-about'>
					{ChatWith}
				</div>
				<i className='fa fa-star'></i>
			</div>
		);
	}
}

export default (ChatHeader);