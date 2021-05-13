
import { Button, Container, FormControl, FormLabel, InputAdornment, makeStyles, TextField, Typography } from '@material-ui/core';
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
    renderInput = ({ label, input, InputProps }) => {
        return (
            <div>
                <FormControl margin="normal" fullWidth>
                    <FormLabel>{label}</FormLabel>
                    <TextField  {...input} variant="outlined" InputProps={InputProps} />
                </FormControl>
            </div>);
    }

    renderPassword = ({ label, input }) => {
        return (
            <div>
                <FormControl margin="normal" fullWidth>
                    <FormLabel >{label}</FormLabel>
                    <TextField {...input} type="password" variant="outlined" InputProps={{
                        endAdornment: (<InputAdornment position="end">
                            <LockOutlined />
                        </InputAdornment>)
                    }} />
                </FormControl>

            </div>);
    }




    onSubmit = ({ email, password }) => {

        this.props.signIn(email, password);
        console.log({ email, password });

    }
    render() {
        const { classes } = this.props;
        console.log("token:" + localStorage.getItem("token"));
        return (
            <div className={classes.wrapper}>
                <Container maxWidth="sm" style={{ paddingTop: '12%' }}>
                    <Typography variant="h4" style={{ textAlign: 'center' }}>Log in</Typography>
                    <form autoComplete="off" className={classes.form} onSubmit={this.props.handleSubmit(this.onSubmit)}>
                        <Field name="email" component={this.renderInput} label="Email" InputProps={{
                            endAdornment: (<InputAdornment position="end">
                                <PersonOutline />
                            </InputAdornment>)
                        }} />
                        <Field name="password" component={this.renderPassword} label="Password" />
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

const loginForm = reduxForm({
    form: "loginForm"
})(withStyles(styles)(Login));

export default connect(null,
    {
        signIn,
        signInWithGoogle
    })(loginForm);