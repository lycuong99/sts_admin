import React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { connect } from 'react-redux';
import { Button, Container, createStyles, Dialog, DialogContent, DialogContentText, DialogTitle, DialogActions, InputAdornment, TextField, withStyles } from '@material-ui/core';
import { getUsers, deleteUser } from "../actions";
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import AddIcon from '@material-ui/icons/Add';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';



const styles = (Theme) => createStyles({
    root: {
        '& .header-table': {
            backgroundColor: 'rgba(255, 7, 0, 0.55)',
        },
    },

    button: {
        //    backgroundColor:'#FA0000',
        minWidth: 46,
        fontSize: '1em',
        // color: "#FA0000",
        padding: 0,
        // borderColor: '#FA0000',
        marginRight: 5,
        '&:hover': {
            // color: "#FFFFFF",
            // backgroundColor: '#FA0000',
            // borderColor: '#FFFFFF',
            boxShadow: 'none',
        },
    },
    deleteButton: {
        color: "#FA0000",
        borderColor: '#fa000080',
    },
    searchButton: {
        borderColor: Theme.palette.primary.main,
        borderWidth: 1,
        color: Theme.palette.primary.main,
        backgroundColor: Theme.palette.common.white,
        fontWeight: 500,
        height: '2.7em',
        // padding: '10px 30px',
        textAlign: 'center',
        '&:hover': {
            color: "#FFFFFF",
            backgroundColor: Theme.palette.primary.main,
            // borderColor: '#FFFFFF',
            boxShadow: 'none',
        },

    },
    searchInput: {
        height: '3em',
        width: '40%',
        '& input': {
            padding: '13px 10px',
        }
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        // width: '100%',
        marginBottom: '0.5em',
        padding: '5px 12px'
    }
})

class UserTable extends React.Component {

    constructor(props) {
        super(props);

    }
    state = { searchValue: '', openDeleteDialog: false, deleteUserId: null };

    handleSearchValueChange = (event) => {
        this.setState({ searchValue: event.target.value });

    }
    componentDidMount() {
        this.props.getUsers();
        // console.log(this.props.getUsers());
    }

    renderSearch = () => {
        return (
            <div className={this.props.classes.toolbar}>
                <TextField classes={{ 'root': this.props.classes.searchInput }} size='small' label="search" variant="outlined" InputProps={{
                    startAdornment: (<InputAdornment position="end">
                        <SearchOutlinedIcon />
                    </InputAdornment>)
                }} value={this.state.searchValue}
                    onChange={this.handleSearchValueChange} />

                <Button variant="outlined" className={this.props.classes.searchButton}> <AddIcon />ADD USER</Button>
            </div>
        );
    }

    renderDeleteDialog = () => {

        const handleClose = () => {
            this.setState({ openDeleteDialog: false });
        }

        return (
            <Dialog
                open={this.state.openDeleteDialog}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Delete Dialog?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {`Do you want to delete user: ${this.state.deleteUserId}`}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
  </Button>
                    <Button onClick={() => { this.props.deleteUser(this.state.deleteUserId); this.setState({ deleteUserId: null }); handleClose(); }} color="primary" autoFocus>
                        Confirm
  </Button>
                </DialogActions>
            </Dialog>
        );
    }

    render() {
        const { classes } = this.props;
        const columns = [
            { field: 'no', headerName: 'ID', width: 70, headerClassName: 'header-table' },
            {
                field: 'name', headerName: 'Full name', width: 200,
                // valueGetter: (params) => {
                //     return `${params.getValue('firstName') || ''} ${params.getValue('lastName') || ''}`
                // }
            },
            {
                field: 'address', headerName: 'Address', headerClassName: 'header-table', width: 160,
            },
            {
                field: 'email', headerName: 'Email', width: 330
            },
            {
                field: 'isAdmin', headerName: 'Is Admin', width: 130
            },
            {
                field: 'action', headerName: "Actions", width: 130, sortable: false,
                headerAlign: 'center',

                renderCell: (params) => {
                    const onClick = () => {
                        this.setState({ openDeleteDialog: true, deleteUserId: params.getValue('email') });
                        // this.setState({ deleteUserId: params.getValue('email') });
                        // alert('hello');
                    }

                    return (<span>
                        <Button className={classes.button} variant='outlined' color='primary'
                            onClick={onClick}> <EditOutlinedIcon fontSize='small' /></Button>
                        <Button onClick={onClick} className={`${classes.button} ${classes.deleteButton}`} variant='outlined'> <CloseOutlinedIcon fontSize='small' /></Button>
                    </span>);
                }

            }
            // {
            //     field: 'isAdmin',
            //     headerName: 'Is Admin',
            //     description: 'This column has a value getter and is not sortable.',
            //     sortable: false,
            //     width: 160,
            //     valueGetter: (params) =>
            //         `${params.getValue('firstName') || ''} ${params.getValue('lastName') || ''}`,
            // },
        ];

        if (!this.props.users) {
            return <p>...Loading</p>;
        }

        const checkCondition = (user) => {
            return user.name.includes(this.state.searchValue) || user.email.includes(this.state.searchValue) || user.address.includes(this.state.searchValue);
        }

        const rows = this.props.users.filter(checkCondition);

        return (
            <Container>
                {this.renderSearch()}
                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid rows={rows} columns={columns} pageSize={5} hideFooterPagination={false} />
                </div>
                {this.renderDeleteDialog()}
            </Container>

        );
    }
}
const mapStateToProps = (state) => {
    return { users: Object.values(state.users) };
}

export default connect(mapStateToProps, {
    getUsers, deleteUser
})(withStyles(styles, { withTheme: true })(UserTable));

