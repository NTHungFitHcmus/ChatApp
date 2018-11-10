import React, { Component } from "react";
import { connect } from "react-redux";

export default function(ComposedComponent) {
	const mapStateToProps = (state) => {
		console.log('require state ');
		console.log(state);
		return {
			auth: state.auth
		}
	}

  class Authentication extends Component {
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

    render() {
      if (this.props.auth) {
        return <ComposedComponent {...this.props} />;
      }
      return null;
    }
  }

  return connect(mapStateToProps)(Authentication);
}