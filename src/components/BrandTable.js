import React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { connect } from 'react-redux';
import { Button, Container, createStyles, Dialog, DialogContent, DialogContentText, DialogTitle, DialogActions, InputAdornment, TextField, withStyles, Paper } from '@material-ui/core';
import { getBrands, deleteBrand } from "../actions";
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import AddIcon from '@material-ui/icons/Add';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import VisibilityOutlined from '@material-ui/icons/VisibilityOutlined';
import { brands } from '../dataTest.js/brand';
import { Link } from 'react-router-dom';
import _ from 'lodash';




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

class BrandTable extends React.Component {

    state = { searchValue: '', openDeleteDialog: false, deleteId: null };

    handleSearchValueChange = (event) => {
        this.setState({ searchValue: event.target.value });

    }
    componentDidMount() {
        this.props.getBrands();
    }

    renderToolbar = () => {
        return (
            <div className={this.props.classes.toolbar}>
                <TextField classes={{ 'root': this.props.classes.searchInput }} size='small' label="search" variant="outlined" InputProps={{
                    startAdornment: (<InputAdornment position="end">
                        <SearchOutlinedIcon />
                    </InputAdornment>)
                }} value={this.state.searchValue}
                    onChange={this.handleSearchValueChange} />

                <Button variant="outlined" className={this.props.classes.searchButton}> <AddIcon />ADD BRAND</Button>
            </div>
        );
    }

    renderDeleteDialog = () => {

        const handleClose = () => {
            this.setState({ openDeleteDialog: false });
        }

        console.log(_.filter(this.props.brands, ['id', this.state.deleteId])[0]?.name);
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
                        {`Do you want to delete brand: ${_.filter(this.props.brands, ['id', this.state.deleteId])[0]?.name}`}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
  </Button>
                    <Button onClick={() => { this.props.deleteBrand(this.state.deleteId); this.setState({ deleteId: null }); handleClose(); }} color="primary" autoFocus>
                        Confirm
  </Button>
                </DialogActions>
            </Dialog>
        );
    }

    render() {
        const { classes } = this.props;
        const columns = [
            { field: 'id', headerName: 'ID', width: 70, headerClassName: 'header-table' },
            {
                field: 'name', headerName: 'Brand Name', flex: 1,
            },
            {
                field: 'hotline', headerName: 'Hot Line', headerClassName: 'header-table', width: 160,
            },
            {
                field: 'totalStaffs', headerName: 'Headquarter', headerClassName: 'header-table', width: 160,
            },
            {
                field: 'action', headerName: "Actions", flex: 0.3, sortable: false,
                headerAlign: 'left',

                renderCell: (params) => {
                    const onClick = () => {
                        this.setState({ openDeleteDialog: true, deleteId: params.getValue('id') });
                        // this.setState({ deleteId: params.getValue('email') });
                        // alert('hello');
                    }

                    return (<span>

                        <Button className={classes.button} variant='outlined' color='primary' component={ Link } to={`/brand/${params.getValue('id')}`}
                        > <VisibilityOutlined fontSize='small' /></Button>

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

        if (!this.props.brands) {
            return <p>...Loading</p>;
        }

        const rows = this.props.brands;


        return (
            <Paper className={this.props.classes.container}>
                {this.renderToolbar()}
                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid rows={rows} columns={columns} pageSize={5} hideFooterPagination={false} />
                </div>
                {this.renderDeleteDialog()}
            </Paper>

        );
    }
}

const mapStateToProps = (state) => {
    return { brands: Object.values(state.brands) };
}

export default connect(mapStateToProps, {
    getBrands, deleteBrand
})(withStyles(styles, { withTheme: true })(BrandTable));

