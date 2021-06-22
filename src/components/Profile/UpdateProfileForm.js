import { Field, reduxForm, formValueSelector, reset, } from 'redux-form';
import { withStyles, createStyles } from '@material-ui/core/styles';
import { Box, Button, Container, FormControl, FormLabel, Grid, makeStyles, Paper, Tab, Tabs, TextField, Typography } from "@material-ui/core"
import { connect } from 'react-redux';
import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
    DatePicker,
} from '@material-ui/pickers';

const styles = (Theme) => createStyles({
    input: {
        fontSize: '1em'
    },
});
class UpdateProfileForm extends React.Component {
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

    renderDateInput = ({ label, input, type = 'date', meta: { touched, invalid, error }, InputProps }) => {
        return (
            <div>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <FormControl margin="normal" fullWidth>
                        <FormLabel>{label}</FormLabel>
                        {/* <TextField  {...input} variant="outlined" size="small" error={touched && invalid} type={type}
                            helperText={touched && error} /> */}
                        <DatePicker
                            variant="inline"
                            inputVariant="outlined"
                            format="MM/dd/yyyy"
                            {...input}
                            size="small"
                            error={touched && invalid}
                            helperText={touched && error}


                        />
                    </FormControl>
                </MuiPickersUtilsProvider>

            </div>);
    }
    onSubmit = (formValues) => {
        try {
            this.props.onSubmit(formValues);
        } catch (e) {
            console.log(e);
        
        }


    }

    render() {
        const { classes } = this.props;

        return (<form autoComplete="off" onSubmit={this.props.handleSubmit(this.onSubmit)}>
            <Grid container direction="column" spacing={1}>
                <Grid container item spacing={3} >
                    <Grid item xs={6}>
                        <Field name="firstName" component={this.renderInput} label="Firstname" />
                    </Grid>
                    <Grid item xs={6}>
                        <Field name="lastName" component={this.renderInput} label="Lastname" />
                    </Grid>
                </Grid>
                <Grid container item spacing={3} >
                    <Grid item xs={6}>
                        <Field name="phone" component={this.renderInput} label="Phone" />
                    </Grid>
                    <Grid item xs={6}>
                        <Field name="dob" component={this.renderDateInput} type="date" label="Day of birth" />
                    </Grid>
                </Grid>

                <Grid item xs={12}>
                    <Field name="email" component={this.renderInput} label="Email Address" />
                </Grid>

                <Grid item xs={12} >
                    <Field name="address" component={this.renderInput} label="Your Address" />
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

    // if (!formValues.email) {
    //     error.email = "You must enter a email";
    // }

    // if (!formValues.password) {
    //     error.password = "You must enter a password";
    // }
    return error;
}

const form = reduxForm({
    form: "updateprofile",
    validate
})(withStyles(styles)(UpdateProfileForm));


const mapStateToProps = (state) => {

}

export default connect(null,
    {
    })(form);