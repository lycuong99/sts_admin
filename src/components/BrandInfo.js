import { Button, Card, CardContent, CardHeader, Chip, Divider, FormControl, FormLabel, Grid, Input, InputBase, makeStyles, MenuItem, OutlinedInput, Paper, Select, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography, useTheme } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { CardCustom } from './CardCustom';
import { Link, useParams } from 'react-router-dom';
import _ from 'lodash';
import JwtToken from '../jwtToken';
import sts from '../apis/sts';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Skeleton from '@material-ui/lab/Skeleton';
import history from '../history';
const useStyles = makeStyles((theme) => ({
    container: {

    },
    containerContent: {
        padding: "40px 30px"
    },
    input: {

    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: 2,
    },
    table: {
        '& td': {
            borderBottom: 'none',
            padding: '6px 16px'
        }
    }
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

function getStyles(name, personName, theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}


export default function BrandInfo() {

    const personalInfo = {
        address: "678 Nguyen Van Linh, Q7",
        hotline: "0989899898",
        id: 1,
        logoImg: null,
        name: "The Effoc",
        posts: null,
        skills: null,
        status: 1,
        stores: null,
        users: null,
    }

    const titles = {
        name: "Brand Name",
        address: "Headquarter",
        hotline: "Hot line",
    }
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        history.goBack();
    };
    const { brandId } = useParams();
    const getBrandInfo = async (id) => {
        const api = `/brands/${id}`;
        const response = await sts.get(api, { headers: { "Authorization": `Bearer ${JwtToken.get()}` } });
    };
    const [brandInfo, setBrandInfo] = useState(null);

    useEffect(
        async () => {
            try {
                const api = `/brands/${brandId}`;
                const response = await sts.get(api, { headers: { "Authorization": `Bearer ${JwtToken.get()}` } });
                console.log(response);
                setBrandInfo(response.data);

            } catch (e) {
                setOpen(true);
            }
        },
        []
    );


    return (
        <Paper className={classes.container}>
            <CardHeader title={
                <Typography variant="h2">
                    Brand Info
                </Typography>
            } disableTypography={false}
            />
            <Divider />
            {!brandInfo ? (<Skeleton variant="rect" width="100%">
                <div style={{ paddingTop: '57%' }} />
            </Skeleton>) : (<CardContent className={classes.containerContent}>
                <Grid container spacing={1} direction="column">
                    <CardCustom header='General'>
                        <Grid container spacing={2}>
                            {
                                Object.keys(titles).map(e => {
                                    return (
                                        <Grid container item key={titles[e]}>
                                            <Grid item xs={2} style={{ fontWeight: 500 }}>{titles[e]}</Grid >
                                            <Grid item xs={1}><Typography variant="body2">:</Typography></Grid >
                                            <Grid item><Typography variant="body2">{brandInfo[e]}</Typography></Grid>
                                        </Grid>
                                    );
                                })
                            }
                        </Grid>

                    </CardCustom>

                    <Grid item  >
                        <Button variant="contained" color="primary" component={Link} to="/brand">Back</Button>
                    </Grid>

                </Grid>
            </CardContent>)}


            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"something went wrong"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                    Brand not found or has been deleted. Back to previous page.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary" autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
        </Paper >
    );
}