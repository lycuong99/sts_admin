
import { Button, Container, FormControl, FormLabel, InputAdornment, TextField, Typography } from '@material-ui/core';
import { LockOutlined, PersonOutline } from '@material-ui/icons';
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { withStyles, createStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { signIn, signInWithGoogle } from '../../actions';
import history from "../../history";

const styles = (Theme) => createStyles({
    wrapper: {
        height: 800,
        display: 'flex',

    },
    form: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        height: 360,
        justifyContent: "space-around"

    },
    lineDivider: {
        paddingTop: '0.5em',
        paddingBottom: '0.5em',
        position: 'relative',
        textAlign: 'center',
        '&::after':
        {
            content: '""',
            width: '100%',
            height: 1,
            backgroundColor: '#6c6a72',
            position: 'absolute',
            left: 0,
            top: '50%',
            zIndex: -1
        },
        "& span": {
            backgroundColor: Theme.palette.common.white,
            padding: "10px 20px"
        }
    },
    button: {
        height: '3em',
        width: '35%',
        borderRadius: 16,
        // padding: '10px 30px',
        textAlign: 'center',
        margin: '10px auto',

    }
});

class Login extends Component {

    handleAuth = () => {
        const { authenticated } = this.props;
        if (authenticated === true && window.location.pathname === "/login") {
            history.push("/");
        }
    }

    componentDidMount = () => {
        this.handleAuth();
    }

    componentDidUpdate = () => {
        this.handleAuth();
    }

    renderInput = ({ label, input, meta: { touched, invalid, error }, InputProps }) => {
        return (
            <div>
                <FormControl margin="normal" fullWidth>
                    <FormLabel>{label}</FormLabel>
                    <TextField  {...input} variant="outlined" InputProps={InputProps} error={touched && invalid}
                        helperText={touched && error} />
                </FormControl>
            </div>);
    }

    renderPassword = ({ label, input, meta: { touched, invalid, error }, }) => {
        return (
            <div>
                <FormControl margin="normal" fullWidth>
                    <FormLabel >{label}</FormLabel>
                    <TextField {...input} type="password" variant="outlined" InputProps={{
                        endAdornment: (<InputAdornment position="end">
                            <LockOutlined />
                        </InputAdornment>)
                    }}
                        error={touched && invalid}
                        helperText={touched && error} />
                </FormControl>

            </div>);
    }




    onSubmit = ({ email, password }) => {
        this.props.signIn(email, password);
        console.log({ email, password });
        console.log('alo');

    }
    render() {
        const { classes } = this.props;
        console.log(this.props.invalidServer);
        console.log("token:" + localStorage.getItem("sts_token"));
        return (
            <div className={classes.wrapper}>
                <Container maxWidth="sm" style={{ paddingTop: '12%' }}>
                    <Typography variant="h1" style={{ textAlign: 'center' }} color='primary'>Log in</Typography>
                    <form autoComplete="off" className={classes.form} onSubmit={this.props.handleSubmit(this.onSubmit)} >
                        <Field name="email" component={this.renderInput} label="Username" InputProps={{
                            endAdornment: (<InputAdornment position="end">
                                <PersonOutline />
                            </InputAdornment>)
                        }} />
                        <Field name="password" component={this.renderPassword} label="Password" />
                        {
                            this.props.invalidServer === true ? (<Typography variant="h4" style={{color: '#f44336'}}> 
                                Invalid Username or Password!
                            </Typography>) : null
                        }


                        <Button color="primary" variant="contained" className={classes.button} type="submit">Log in</Button>
                        <div className={classes.lineDivider}>
                            <span>or login with</span>
                        </div>
                        <Button className={classes.button} variant="outlined" color="primary" type="button">Google</Button>
                    </form>

                </Container>
            </div>
        );
    }
}

//TODO Invalid email or password error
const validate = (formValues) => {
    const error = {};

    if (!formValues.email) {
        error.email = "You must enter a username";
    }
    if (!formValues.password) {
        error.password = "You must enter a password";
    }
    return error;
}

const loginForm = reduxForm({
    form: "loginForm",
    validate
})(withStyles(styles)(Login));

const mapStateToProps = (state) => {
    return {
        authenticated: state.auth.authenticated,
        invalidServer: state.auth.invalid
    }
}
export default connect(mapStateToProps,
    {
        signIn,
        signInWithGoogle
    })(loginForm);