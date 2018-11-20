import React from 'react';
import { Tab, TabbedShowLayout, ShowView, ShowController, BooleanField, ReferenceArrayField, NumberInput, FormDataConsumer, BooleanInput, Labeled, EmailField, ReferenceArrayInput, SelectArrayInput, ArrayInput, SimpleFormIterator, RichTextInput, DateInput, ArrayField, ShowButton, Show, Filter, List, Edit, Create, Datagrid, ReferenceField, TextField, EditButton, DisabledInput, LongTextInput, ReferenceInput, SelectInput, SimpleForm, TextInput, SimpleShowLayout } from 'react-admin';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Avatar from '@material-ui/core/Avatar';
import DoneIcon from '@material-ui/icons/Done';
import BlockIcon from '@material-ui/icons/Block';
import Chip from '@material-ui/core/Chip';
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import StatusStatisticsContainer from './StatusStatisticsContainer';
import StatusTrendContainer from './StatusTrendContainer'
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

const gridStyle = {
    width: '60%',

};


export const DeviceList = (props) => (
    <Grid container spacing={24}>
        <Grid item xs={4}>
        <StatusStatisticsContainer/>
        </Grid>

        <Grid item xs={8}>
        <StatusTrendContainer/>
        </Grid>

        <Grid item xs={12}>
            <Paper elevation={11}>
                <List title="Devices" {...props} perPage={5} sort={{ field: 'telematicsSerialNumber', order: 'DESC' }} >
                    <DeviceGrid />
                    {/* <Datagrid>
                        <TextField label="Status" source="avaiabilityStatus" />
                        <TextField label="Serial#" source="telematicsSerialNumber" />
                        <TextField label="Device" source="model" />
                        <TextField label="Asset" source="assetName" />
                        <TextField label="Last Comm." source="lastCommunicated" />
                    <ShowButton />
                     </Datagrid> */}
                </List>
            </Paper>
        </Grid>

    </Grid>
);




const DeviceGrid = ({ ids, data, basePath }) => (
    <div style={{ gridStyle }}>

        <Table style={{ tableLayout: 'auto' }}  >
            <TableHead>
                <TableRow>
                    <TableCell>Status</TableCell>
                    <TableCell>Serial#</TableCell>
                    <TableCell>Device</TableCell>
                    <TableCell> Asset</TableCell>
                    <TableCell>Last Comm.</TableCell>
                    <TableCell>Device Detail</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {ids.map(id => {
                    return (
                        <TableRow
                            //  hover
                            //  onClick={ this.handleShowSensorList(row.sensorGroup)}
                            //    onClick={event => this.handleShowSensorList(row)}
                            // value={row.sensorGroup}
                            key={id}>

                            {(data[id]).avaiabilityStatus == 1 && (
                                // <TableCell style={{ backgroundColor: "green" }} >{(data[id]).avaiabilityStatus}</TableCell>
                                <TableCell>
                                    {/* <Avatar style={{ backgroundColor:'#63B239',width:30, height:30,alignItems: 'center'}} >
                                <DoneIcon/>
                                </Avatar> */}
                                    <Chip
                                        avatar={
                                            <Avatar style={{ backgroundColor: '#81C784', width: 30, height: 30 }} >
                                                <DoneIcon />
                                            </Avatar>
                                        }
                                        label=" Avaiable "
                                        // color="default"
                                        variant="outlined"
                                    />
                                </TableCell>
                            )}

                            {(data[id]).avaiabilityStatus == 0 && (
                                <TableCell>
                                    <Chip
                                        avatar={
                                            <Avatar style={{ backgroundColor: '#D81B60', width: 30, height: 30 }} >
                                                <BlockIcon />
                                            </Avatar>
                                        }
                                        label="Unavaiable"
                                        variant="outlined"
                                    />
                                </TableCell>

                            )}
                            <TableCell>{(data[id]).telematicsSerialNumber}</TableCell>
                            <TableCell>{(data[id]).model}</TableCell>
                            <TableCell>{(data[id]).assetName}</TableCell>

                            {(data[id]).lastCommunicated === 'unvailable' && (
                                 <TableCell>{"unavaiable"}</TableCell>
                            )}  

                            {(data[id]).lastCommunicated != 'unvailable' && (
                                  <TableCell>{new Date().toISOString()}</TableCell>
                            )}    

                            {/* <TableCell>{new Date().toISOString()}</TableCell> */}
                            <TableCell>
                                <ShowButton
                                    resource="getDeviceList" basePath={basePath} record={(data[id])}
                                />
                            </TableCell>
                            {/* {(data[id]).partStatus == "Unauthorized" && (
                                <TableCell style={{ backgroundColor: "red" }} >{(data[id]).partStatus}</TableCell>
                            )} */}






                            {/* <TableCell >{row.sensorCount}</TableCell>
                            <TableCell >{row.description}</TableCell>
                            <TableCell>
                                <IconButton
                                    value={row.sensorGroup}
                                    onClick={event => this.handleShowSensorList(row)}
                                >
                                    <SensorListIcons />
                                </IconButton>
                            </TableCell> */}
                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>
    </div>

)

DeviceGrid.defaultProps = {
    data: {},
    ids: [],
};




const DeviceTitle = ({ record }) => {
    return <span>Device / {record ? `${record.telematicsSerialNumber}` : ''}</span>;
};
export const showDevice = (props) => (

    <Show title={<DeviceTitle />} {...props}  >

        <TabbedShowLayout>
            <Tab label="Device Details">
                <TextField label="Telematics Serial Number" source="telematicsSerialNumber" />
                <TextField label="Device Model" source="model" />
                <TextField label="Activation Date" source="activatedDate" />
                <TextField label="Last Communication" source="lastCommunicated" />
            </Tab>

            <Tab label="Asset Details">
                <TextField label="Name" source="assetName" />
                <TextField label="Model" source="model" />
                <TextField label="Make" source="make" />
                <TextField label="Model Year" source="modelYear" />
                <TextField label="Compressor Controller" source="compressorController" />
                <TextField label="Compressor Type" source="compressorType" />
                <TextField label="Distributor Name" source="distributorName" />
                <TextField label="Motor HP" source="motorHP" />
                <TextField label="Nominal Package FlowRating" source="nominalPackageFlowRating" />
            </Tab>
        </TabbedShowLayout>

    </Show>
);