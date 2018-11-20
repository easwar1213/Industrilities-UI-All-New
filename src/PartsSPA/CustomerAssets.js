import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import SensorListIcons from '@material-ui/icons/List';
import { fetchEnd, fetchStart, showNotification, GET_LIST, UPDATE } from 'react-admin';
import dataProvider from '../dataProvider';

import { Col, Container, Row } from 'reactstrap';
import Grid from "@material-ui/core/Grid";



const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
});



class CustomerAssets extends React.Component {

    state = {
        customerAssetList: [],
        showSensorGroupList: false,
        showSensorList: false,
        selectedSensorGroup: '',
        selectedSensorGroupList: [],
        selectedSensorGroupData: [],
        selectedSensors: []
    };


    componentDidMount() {
        console.log("customerAssets")
        //console.log(this.props)
        fetchStart();
        dataProvider(GET_LIST, 'getCustomerAssets', {
            pagination: { page: 1, perPage: 10 },
            sort: { field: 'title', order: 'ASC' },
            filter: {customer:this.props.customer},
        })
            .then((response) => {
               this.setState({customerAssetList: response.json})
               console.log("customerAssetList")
              // console.log(response)
               console.log(this.state.customerAssetList)
            })
            .catch(error => {
                // showNotification(error.message, 'error');
            })
            .finally(() => {
                fetchEnd();
            });
    }


    render() {
        const { classes, record } = this.props;
         console.log("render")
        return (
            
                
                    <div>
                        <Paper className={classes.root}>
                            <Table className={classes.table}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Customer Name</TableCell>
                                        <TableCell >Asset Name</TableCell>
                                        <TableCell >Telematics Serial Number</TableCell>
                                        <TableCell >Model</TableCell>
                                        <TableCell >Total Parts</TableCell>
                                        <TableCell >Active Parts </TableCell>
                                        <TableCell >Unauthorized Parts</TableCell>
                                        <TableCell >Expired Parts</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.customerAssetList.map(row => {
                                        return (
                                            <TableRow
                                                //  hover
                                                //  onClick={ this.handleShowSensorList(row.sensorGroup)}
                                                //    onClick={event => this.handleShowSensorList(row)}
                                               // value={row.sensorGroup}
                                                key={row.id}>
                                                <TableCell component="th" scope="row">
                                                    {row.customerName}
                                                </TableCell>
                                                {/* <TableCell >{row.sensorGroup}</TableCell> */}
                                                <TableCell >{row.assetName}</TableCell>
                                                <TableCell >{row.telematicsSerialNumber}</TableCell>
                                                <TableCell >{row.model}</TableCell>
                                                <TableCell >{row.parts.length}</TableCell>
                                                <TableCell >{0}</TableCell>
                                                <TableCell >{0}</TableCell>
                                                <TableCell >{0}</TableCell>
                                                <TableCell>
                                                    <IconButton
                                                        value={row.sensorGroup}
                                                        onClick={event => this.handleShowSensorList(row)}
                                                    >
                                                        <SensorListIcons />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </Paper>
                    </div>
                
            
        )
    }

}


CustomerAssets.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomerAssets);