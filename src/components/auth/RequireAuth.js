import React from 'react';
import { connect } from 'react-redux';
import history from "../../history";

class Authentication extends React.Component {

    handleAuth = () => {
        const { authenticated } = this.props;
    
        if (authenticated === false && window.location.pathname !== "/login") {
            history.push("/login");
        }
    }

    componentDidMount = () => {
        this.handleAuth();
    }

    componentDidUpdate = () => {
        this.handleAuth();
    }


    render() {
        return (this.props.children);
    }
}

const mapStateToProps = (state) => {
    return {
        authenticated: state.auth.authenticated
    }
}

export default connect(mapStateToProps)(Authentication);