import { Button } from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';
import { logOut } from '../../actions';

class Logout extends React.Component {

    render() {
        return (
            <Button onClick={() => { this.props.logOut() }}>
                Logout
            </Button>
        );
    }
}
const mapStateToProps = () => {

}

export default connect(null, {
    logOut
})(Logout);