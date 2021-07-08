import { Backdrop, Box, Button, CircularProgress, Container, FormControl, FormLabel, Grid, makeStyles, Paper, Snackbar, Tab, Tabs, TextField, Typography } from "@material-ui/core"
import { PostAdd } from "@material-ui/icons";
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import UpdateProfileForm from "./UpdateProfileForm";
import JwtToken from "../../jwtToken";
import sts from "../../apis/sts";
import MuiAlert from '@material-ui/lab/Alert';
import ChangePasswordForm from "./ChangePasswordForm";


const useStyles = makeStyles((theme) => ({
    card: {
        padding: "30px 25px",
    },
    input: {
        fontSize: '1em'
    },
    form: {
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
        width: 300
    },
    container: {

        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        padding: 20,

    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function TabPanel(props) {
    const { children, value, index, ...other } = props;
    const classes = useStyles();
    return (
        <div
            role="tabpanel" className={classes.card}
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
            style={{ width: '100%' }}
        >
            {value === index && (
                <Box p={3}>
                    {children}
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

const Profile = () => {

    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const [openSuccessAlert, setSuccessAlert] = React.useState(false);
    const [openBackdrop, setOpenBackdrop] = React.useState(false);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const handleUpdateProfile = async (formValues) => {
        //setSuccessAlert(true);
        const api = `/users/`;
        console.log(JwtToken.get());
        const { firstName, lastName, email, address, dob, phone } = formValues;
        const response = await sts.put(api, {
            firstName, lastName, email, address, dob, phone
        }, {
            headers: { Authorization: `Bearer ${JwtToken.get()}` },

        });
        setSuccessAlert(true);
    };
    const handleChangePassword = async (formValues) => {
        //setSuccessAlert(true);
        const api = `/users/password`;
        const { currentPassword, newPassword } = formValues;


        const response = await sts.put(api, {
            currentPassword, newPassword
        }, {
            headers: { Authorization: `Bearer ${JwtToken.get()}` },
        });
        console.log(response);
        setSuccessAlert(true);







    };

    const [userProfile, setUserProfile] = React.useState(null);

    const getUserProfile = async () => {
        const api = `/users/profile`;
        const response = await sts.get(api, { headers: { "Authorization": `Bearer ${JwtToken.get()}` } });
        const date = new Date(response.data.dob);
        response.data.dob = date;
        return response.data;
    };

    useEffect(
        async () => {
            setOpenBackdrop(true);
            const datas = await getUserProfile();
            setUserProfile(datas);
            setOpenBackdrop(false);
        }, []
    );

    return (
        <Paper className={classes.container} elevation={0}>
            <Backdrop className={classes.backdrop} open={openBackdrop}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <Snackbar open={openSuccessAlert} autoHideDuration={6000} onClose={() => { setSuccessAlert(false); }}>
                <Alert onClose={() => { setSuccessAlert(false); }} severity="success">
                    Update success!
                </Alert>
            </Snackbar>
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                className={classes.tabs}
            >
                <Tab label="Edit Profile" />
                <Tab label="Change Password" />
            </Tabs>
            <TabPanel value={value} index={0}>
                <h2>Edit Profile</h2>
                <UpdateProfileForm initialValues={userProfile} onSubmit={handleUpdateProfile} />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <h2>Change Password</h2>
                <ChangePasswordForm onSubmit={handleChangePassword} />
            </TabPanel>
        </Paper>
    );
}

export default Profile;