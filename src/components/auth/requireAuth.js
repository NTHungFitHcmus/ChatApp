import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types'
import { firebaseConnect } from 'react-redux-firebase';
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
      if (this.props.auth === null) {
        history.push("/");
      }
    }

    componentWillUpdate(nextProps) {	
			const {history} = this.props; 
      if (!nextProps.auth) {
        history.push("/");
      }
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