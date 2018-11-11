import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { compose } from 'redux';

export default function(ComposedComponent) {
	// const mapStateToProps = (state) => {
		// console.log('require state ');
		// console.log(state);
		// return {
			// auth: state.auth
		// }
	// }

  class Authentication extends Component {
		static propTypes = {
			authExists: PropTypes.bool,
		}
		constructor(props){
			super(props)
		};
		
    componentWillMount() {	
			const {history} = this.props; 
      !isLoaded(this.props.auth)
			? console.log('loadingAuth')
			: isEmpty(this.props.auth)
					? history.push("/")
					: console.log('Authed')
    }

    componentWillUpdate(nextProps) {	
			const {history} = this.props; 
      
			!isLoaded(nextProps.auth)
			? console.log('loadingAuth')
			: isEmpty(nextProps.auth)
					? history.push("/")
					: console.log('Authed')
    }
		// componentWillReceiveProps({ authExists }) {
			// if (!authExists) {
				// const {history} = this.props;
				// history.push('/');
			// }
			// else {
				// const {history} = this.props;
				// history.push('/dashboard');
			// }
		// }

    render() {
      if (this.props.auth) {
        return <ComposedComponent {...this.props} />;
      }
      return null;
    }
  }

  return connect((state) => ({
			auth: state.firebase.auth
    }))
	(Authentication);
}