import { Checkbox, Dialog, DialogContent, DialogContentText, DialogTitle, DialogActions, FormLabel, FormControl, Button, TextField, createStyles, withStyles, FormControlLabel, Typography } from '@material-ui/core';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import React from 'react';
import sts from '../../apis/sts';
import JwtToken from '../../jwtToken';


const styles = (Theme) => createStyles({
    wrapper: {
        height: 800,
        display: 'flex',

    },
    form: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        minWidth: 400,
        minHeight: 500,
        justifyContent: "space-around"

    },
    fieldLabel: {
        marginBottom: 5
    }

});

class AddUser extends React.Component {

    renderInput = ({ label, input, meta: { touched, invalid, error }, InputProps }) => {
        return (
            <div>
                <FormControl margin="normal" fullWidth>
                    <FormLabel classes={{ 'root': this.props.classes.fieldLabel }}>{label}</FormLabel>
                    <TextField  {...input} variant="outlined" InputProps={InputProps} error={touched && invalid}
                        helperText={touched && error} />
                </FormControl>
            </div>);
    }

    renderRadio = ({ label, input, meta: { touched, invalid, error }, InputProps }) => {
        return (
            <div>
                <FormControlLabel style={{ marginLeft: 0 }}
                    control={<Checkbox color="primary" checked={input.value ? true : false}
                        onChange={input.onChange} />}
                    label={label}
                    labelPlacement="start"
                />

            </div>);
    }

    renderPassword = ({ label, input, meta: { touched, invalid, error }, }) => {
        return (
            <div>
                <FormControl margin="normal" fullWidth>
                    <FormLabel >{label}</FormLabel>
                    <TextField {...input} type="password" variant="outlined"
                        error={touched && invalid}
                        helperText={touched && error} />
                </FormControl>

            </div>);
    }

    onSubmit = async({ email, username, isAdmin, password }) => {
        console.log({email, username, isAdmin, password});
        
        try {
            const api = isAdmin? "/users/admin" : "/auth/register";
            const response = await sts.post(api,{ email, username, password}, { headers: { "Authorization": `Bearer ${JwtToken.get()}` } });

        } catch (error) {
            console.log(error);
        }

        this.props.handleClose();

    }

    render() {

        const dialogTitle = 'Add User';

        return (<Dialog
            open={this.props.open}
            aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description"
        >
            <form className={this.props.classes.form} onSubmit={this.props.handleSubmit(this.onSubmit)}>
                <DialogTitle id="alert-dialog-title">{dialogTitle}</DialogTitle>
                <DialogContent>
                    <div>
                        <Field name="email" component={this.renderInput} label="Email" />
                        <Field name="username" component={this.renderInput} label="Username" />
                        <Field name="isAdmin" component={this.renderRadio} label="Is a admin ?" />
                        <Field name="password" component={this.renderPassword} label="Password" />
                        <Field name="confirm" component={this.renderPassword} label="Confirm" />

                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button type="submit" color="primary" autoFocus>
                        Confirm
                    </Button>
                </DialogActions>
            </form>
        </Dialog >);
    }
}

const AddUserForm = reduxForm({
    form: "addUserForm",
})(withStyles(styles)(AddUser));

export default connect()(AddUserForm);