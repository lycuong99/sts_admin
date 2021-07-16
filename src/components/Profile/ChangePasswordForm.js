import { Field, reduxForm, formValueSelector, reset, SubmissionError } from 'redux-form';
import { withStyles, createStyles } from '@material-ui/core/styles';
import { Box, Button, Container, FormControl, FormLabel, Grid, makeStyles, Paper, Tab, Tabs, TextField, Typography } from "@material-ui/core"
import { connect } from 'react-redux';
import React from 'react';
import DateFnsUtils from '@date-io/date-fns';

const styles = (Theme) => createStyles({
    input: {
        fontSize: '1em'
    },
});

class ChangePasswordForm extends React.Component {
    renderInput = ({ label, input, type = 'text', meta: { touched, invalid, error }, InputProps }) => {
        return (
            <div>
                <FormControl margin="normal" fullWidth>
                    <FormLabel>{label}</FormLabel>
                    <TextField  {...input} variant="outlined" size="small" error={touched && invalid} type={type}
                        helperText={touched && error} />
                </FormControl>
            </div>);
    }


    onSubmit = async (formValues) => {
        try {
            await this.props.onSubmit(formValues);
        } catch (e) {
            console.log(e);
            throw new SubmissionError({
                currentPassword: "Current Password maybe incorrect!",
                _error: 'Change Password failed!'
            })
        }
    }

    render() {
        const { classes } = this.props;

        return (<form autoComplete="off" onSubmit={this.props.handleSubmit(this.onSubmit)}>
            <Grid container direction="column" spacing={1}>
                <Grid item xs={12}>
                    <Field name="currentPassword" component={this.renderInput} label="Current Password" type='password' />
                </Grid>

                <Grid item xs={12} >

                    <Field name="newPassword" component={this.renderInput} label="New Password" type='password' />
                </Grid>

                <Grid item xs={12} >
                    <Field name="confirmPassword" component={this.renderInput} label="Confirm" type='password' />
                </Grid>
                <Grid item container xs={12} justify="flex-end" spacing={1} direction="row">
                    <Grid item  >
                        <Button type="submit" variant="contained" color="primary">Save change</Button>
                    </Grid>
                    <Grid item >
                        <Button onClick={() => { this.props.reset() }} variant="outlined" color="primary">Cancel </Button>
                    </Grid>
                </Grid>
            </Grid>

        </form>);
    }
}

const validate = (formValues) => {
    const error = {};
    if (!formValues.currentPassword) {
        error.currentPassword = "You must enter a current password";
    }
    if (!formValues.newPassword) {
        error.newPassword = "You must enter a new password";
    }
    if (!formValues.confirmPassword) {
        error.confirmPassword = "You must enter a confirm password";
    }


    if (formValues.newPassword !== formValues.confirmPassword) {
        error.confirmPassword = "Confirm is unmatch!"
    }

    if (formValues.newPassword && formValues.newPassword.length < 6) {
        error.password = "Required length >=6";
    }

    return error;
}

const form = reduxForm({
    form: "changepassword",
    validate
})(withStyles(styles)(ChangePasswordForm));


const mapStateToProps = (state) => {

}

export default connect(null,
    {
    })(form);