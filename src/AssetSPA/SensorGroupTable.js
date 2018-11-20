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
import { fetchEnd, fetchStart, GET_LIST } from 'react-admin';
import dataProvider from '../dataProvider';
import EnhancedTable from './DataTable'
import { Container, Row } from 'reactstrap';
import Grid from "@material-ui/core/Grid";
//import DeluxeSummaryChart from './Assets/TestCharts'
import SensorListDatagraphTabs from "./SensorListDataGraphTabs"

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





class SensorGroupTable extends React.Component {

    state = {

        sensorGroupList: [],
        showSensorGroupList: false,
        showSensorList: false,
        selectedSensorGroup: '',
        selectedSensorGroupList :[],
        selectedSensorGroupData :[],
        selectedSensors:[]
    };


    componentDidMount() {
        console.log(this.props)
        fetchStart();
        dataProvider(GET_LIST, 'getListOfSensorGroups', {
            pagination: { page: 1, perPage: 10 },
            sort: { field: 'title', order: 'ASC' },
            filter: {asset:this.props.record.assetName},
        })
            .then((response) => {

                let sensorGroupList = response.data
                this.setState({ sensorGroupList: sensorGroupList })
               // console.log(sensorGroupList)
                this.setState({ showSensorGroupList: true })
            })
            .catch(error => {
                // showNotification(error.message, 'error');
            })
            .finally(() => {
                fetchEnd();
            });
    }

    handleClickSelectOnChild = (childProps) => {
        console.log("childProps")
        console.log(childProps)
        this.setState({selectedSensors:childProps})
        // call dynamoDB t
    }

    handleShowSensorList = (item) => {
      //  console.log("handleShowSensorList")
        //console.log(item)
       // this.setState({ showSensorGroupList: false })
        this.setState({ selectedSensorGroup: item.sensorGroup })
        fetchStart();
        dataProvider(GET_LIST, 'getListOfSensors', {
            pagination: { page: 1, perPage: 10 },
            sort: { field: 'title', order: 'ASC' },
            filter: { sensorGroup: item.sensorGroup },
        })
            .then((response) => {
             //   this.setState({ showSensorList: true })
                let selectedSensorGroupList = response.data
                 this.setState({ selectedSensorGroupList: selectedSensorGroupList })
                 this.handleGetSensorsCurrentValue(selectedSensorGroupList)
                console.log(this.state.selectedSensorGroup)
            })
            .catch(error => {
                //showNotification(error.message, 'error');
            })
            .finally(() => {
                fetchEnd();
            });
    };

    handleGetSensorsCurrentValue = (sensorList) => {

        this.setState({ showSensorGroupList: false })
        let projectionString ="";
        let telematicsSerialNumber = this.props.record.telematicsSerialNumber
        console.log(telematicsSerialNumber)
        let counter =0 ,count= sensorList.length;
        sensorList.map(sensor=>{
            if(counter== (count-1)){
                projectionString+= sensor.id
            }
            else {
                projectionString+= sensor.id+","
            }
          
            counter++;
        })
        console.log(projectionString)
        fetchStart();
        dataProvider(GET_LIST, 'getAssetCurrentData', {
            pagination: { page: 1, perPage: 10 },
            sort: { field: 'title', order: 'ASC' },
            filter: { projection: projectionString, id:telematicsSerialNumber, asset:this.props.record.assetName },
        })
            .then((response) => {
                console.log(response)
                this.setState({selectedSensorGroupData:response.json})
                
                this.setState({ showSensorList: true })
               // console.log(selectedSensorGroupList)
            })
            .catch(error => {
                //showNotification(error.message, 'error');
            })
            .finally(() => {
                fetchEnd();
            });
    }





    render() {
        const { classes,record } = this.props;
       // console.log(this.props)
        return (
            <div>
                {this.state.showSensorGroupList && (
                    <div>
                        <Paper className={classes.root}>
                            <Table className={classes.table}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Sensor Group</TableCell>
                                        <TableCell >Sensor Count</TableCell>
                                        <TableCell >Description</TableCell>
                                        <TableCell >Sensor List</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.sensorGroupList.map(row => {
                                        return (
                                            <TableRow
                                                //  hover
                                                //  onClick={ this.handleShowSensorList(row.sensorGroup)}
                                                //    onClick={event => this.handleShowSensorList(row)}
                                                value={row.sensorGroup}
                                                key={row.id}>
                                                <TableCell component="th" scope="row">
                                                    {row.sensorGroup}
                                                </TableCell>
                                                {/* <TableCell >{row.sensorGroup}</TableCell> */}
                                                <TableCell >{row.sensorCount}</TableCell>
                                                <TableCell >{row.description}</TableCell>
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
                )}

                {this.state.showSensorList && (
                               
                                <Container className='dashboard'>
                                    <Row>
                                        <Grid container spacing={24}>
                                            
                                            <EnhancedTable action ={this.handleClickSelectOnChild} data={this.state.selectedSensorGroupData} asset={record.telematicsSerialNumber} value={this.state.selectedSensorGroup}/>                          
                                            <br />
                                           <br />
                                            <Grid  item xs ={8}>
                                            <Paper>
                                            <SensorListDatagraphTabs asset={this.props.record.assetName} group={this.state.selectedSensorGroup} data={this.state.selectedSensors} />
                                            </Paper>
                                            </Grid>
                                      
                                        </Grid>
                    
                                    </Row>
                                </Container>
                               
                   
                    //   <span>  
                    // <div>
                    //     <EnhancedTable value={this.state.selectedSensorGroup} />
                       
                   
                    //     <EnhancedTable value={this.state.selectedSensorGroup} />
                      
                    // </div>   
                    // </span> 
                
                   )}

            </div>
        );
    }
}

SensorGroupTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SensorGroupTable);
