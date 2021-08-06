import React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { connect } from 'react-redux';
import { Button, Container, createStyles, Dialog, DialogContent, DialogContentText, DialogTitle, DialogActions, InputAdornment, TextField, withStyles, Paper } from '@material-ui/core';
import { getUsers, deleteUser } from "../actions";
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import AddIcon from '@material-ui/icons/Add';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';

import AddUser from './dialogs/AddUser';


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
    },
    container: {
        padding: 20
    }
})

class UserTable extends React.Component {

    state = {
        searchValue: this.props.searchValue, openDeleteDialog: false, deleteUserId: null, openAddDialog: false,
        pageSize: 10, rowCount: 0, pageIndex: 1, loading: false, datas: this.props.users
    };

    handleSearchValueChange = (event) => {
        this.setState({ searchValue: event.target.value });
    }

    handleSearchSubmit = (e) => {
        if (e.which === 13) {
            this.props.getUsers(this.props.pageIndex, this.props.pageSize, this.state.searchValue);
        }
    }
    componentDidMount() {
        this.props.getUsers(1, 10, "");
    }

    handlePageChange = (params) => {
        console.log(params);
        if (params.page >= params.pageCount) {
            this.props.getUsers(1, params.pageSize, this.state.searchValue ? this.state.searchValue : "");
        } else {
            this.props.getUsers(params.page + 1, params.pageSize, this.state.searchValue ? this.state.searchValue : "");
        }

    };

    componentDidUpdate(prevProps, prevState) {
        if (prevState.pageSize !== this.state.pageSize || prevState.pageIndex !== this.state.pageIndex) {
            const { searchValue, pageSize, pageIndex } = this.state;
            const response = this.loadData(searchValue, pageSize, pageIndex);
        }
    }

    renderToolbar = () => {
        return (
            <div className={this.props.classes.toolbar}>
                <TextField classes={{ 'root': this.props.classes.searchInput }} size='small' label="search" variant="outlined" InputProps={{
                    startAdornment: (<InputAdornment position="end">
                        <SearchOutlinedIcon />
                    </InputAdornment>)
                }}
                    onChange={this.handleSearchValueChange}
                    onKeyPress={this.handleSearchSubmit} />

                <Button variant="outlined" className={this.props.classes.searchButton}
                    onClick={() => { this.setState({ openAddDialog: !this.state.openAddDialog }) }}> <AddIcon />ADD USER</Button>
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
                    <Button onClick={() => { this.props.deleteUser(this.state.deleteUserId); this.setState({ deleteUserId: "" }); handleClose(); }} color="primary" autoFocus>
                        Confirm
                    </Button>

                </DialogActions>
            </Dialog>
        );
    }

    handlePageSizeChange = (params) => {
        // setPageSize(params.pageSize);
    };


    render() {
        const { classes } = this.props;
        const columns = [
            {
                field: 'counterStatus', headerName: 'No', width: 70, headerClassName: 'header-table', filterable: false,

            },
            {
                field: 'username', headerName: 'Username', width: 200,
            }, {
                field: 'name', headerName: 'Full name', width: 200,
                valueGetter: (params) => {
                    return `${params.getValue('firstName') || ''} ${params.getValue('lastName') || ''}`
                }
            },
            {
                field: 'address', headerName: 'Address', headerClassName: 'header-table', width: 160, filterable: false, sortable: false
            },
            {
                field: 'email', headerName: 'Email', flex: 1, filterable: false, sortable: false
            },
            {
                field: 'isAdmin', headerName: 'Is Admin', width: 130, filterable: false, sortable: false,
                valueGetter: (params) => {
                    return (params.getValue("role").id == 1 ? "Admin" : "User")
                }
            },
            {
                field: 'action', headerName: "Actions", flex: 0.3, sortable: false, filterable: false,
                headerAlign: 'center',

                renderCell: (params) => {
                    const onClick = () => {
                        this.setState({ openDeleteDialog: true, deleteUserId: params.getValue('username') });
                        // this.setState({ deleteUserId: params.getValue('email') });
                        // alert('hello');
                    }

                    return (<span>
                        <Button className={classes.button} variant='outlined' color='primary'
                           > <VisibilityOutlinedIcon fontSize='small' /></Button>
                        {params.getValue("role").id == 1 ? null :
                            <Button onClick={onClick} className={`${classes.button} ${classes.deleteButton}`}
                                variant='outlined'> <CloseOutlinedIcon fontSize='small' /></Button>}
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


        return (
            <Paper className={this.props.classes.container} >
                <h2>User</h2>
                {this.renderToolbar()}
                <div style={{ height: 600, width: '100%' }}>
                    <DataGrid disableColumnFilter rows={this.props.users} columns={columns} rowsPerPageOptions={[10, 20, 50]} pageSize={this.props.pageSize} pagination
                        page={this.props.pageIndex - 1}
                        paginationMode="server" rowCount={this.props.rowCount} onPageChange={this.handlePageChange} onPageSizeChange={this.handlePageChange} />
                </div>
                {this.renderDeleteDialog()}
                <AddUser open={this.state.openAddDialog} handleClose={() => { this.setState({ openAddDialog: false }) }} />
            </Paper >

        );
    }
}

const mapStateToProps = (state) => {
    return {
        users: Object.values(state.users.datas), pageIndex: state.users.currentPage, pageSize: state.users.pageSize, rowCount: state.users.totalCount,
        searchValue: state.users.searchValue
    };
}

export default connect(mapStateToProps, {
    getUsers, deleteUser
})(withStyles(styles, { withTheme: true })(UserTable));

