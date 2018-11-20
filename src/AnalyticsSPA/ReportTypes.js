import React, { Component } from 'react';
import { connect } from 'react-redux';
import { change, submit, isSubmitting } from 'redux-form';
import { withRouter } from 'react-router-dom'

import {
    fetchEnd,
    fetchStart,
    required,
    showNotification,
    Button,
    SaveButton,
    SimpleForm,
    TextInput,
    GET_LIST,
    LongTextInput,
    UPDATE,
    REDUX_FORM_NAME,
    Datagrid
} from 'react-admin';
import { push } from 'react-router-redux';
import PropTypes from 'prop-types';
import { Card, CardBody, Col, Container, Row } from 'reactstrap';
import FormControl from '@material-ui/core/FormControl';
import SpeakerNotes from '@material-ui/icons/SpeakerNotes';
import ListIcon from '@material-ui/icons/List';
import IconCancel from '@material-ui/icons/Cancel';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import dataProvider from '../dataProvider';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import ListItemText from '@material-ui/core/ListItemText';
import Input from '@material-ui/core/Input';
import RandomAnimatedBars from './RandomAnimatedBars'
import Grid from "@material-ui/core/Grid";
import CustomizedTable from './CustomTable';
import { resolve } from 'url';
import DynamicTable from './ReactTable'
//import MonthlyRevenue from './MonthlyRevenue'
import NativeSelect from '@material-ui/core/NativeSelect';
import Paper from "@material-ui/core/Paper";
import UtilizationSummary from './UtilizationSummary';
import FaultSummary from './FaultSummary';
import WSReport from './WSReport'
import DeluxeReport from './DeluxeReport'

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
const maintenanceValues = [

    {
        value: 'due',
        label: 'Due',
    },
    {
        value: 'upcoming',
        label: 'Upcoming',
    },

];

class ReportTypes extends Component {
    state = {
        error: false,
        showDialog: false,
        selectedAssets: [],
        assets: [],
        startDate: '',
        endDate: '',
        showDailyAssetRunTable: false,
        showDetailedAssetRunTable: false,
        showAssetRunSummaryReport: false,
        showAssetFaultDataReport: false,
        showAssetFaultSummary: false,
        showWSServiceReport: false,
        showDeluxeStationaryReport: false,
        detailedAssetRunTableCol: '',
        summaryReportData: '',
        reportData: [],
        dateRange: ''
    };


    componentDidMount() {
        this.handleGetAssetList()

    }

    handleDateRange = (e) => {
        // console.log(e.target.value)
        this.setState({ dateRange: e.target.value })

    }

    handleBackToList = () => {
        const { push } = this.props;
        // console.log("push")
        push('/getListOfAnalyticsReports')
        // history.push('/getListOfAnalyticsReports')
        //  this.props.dispatch(routeActions.push('/getListOfAnalyticsReports'));
    }

    handleGetAssetList = () => {

        fetchStart();
        dataProvider(GET_LIST, 'getAssetListForReference', {
            pagination: { page: 1, perPage: 10 },
            sort: { field: 'title', order: 'ASC' },
            filter: {},
        })
            .then((response) => {

                let assets = response.data
                this.setState({ assets: assets })
                console.log(assets)
            })
            .catch(error => {
                showNotification(error.message, 'error');
            })
            .finally(() => {
                fetchEnd();
            });
    };

    handleReportData = () => {
        console.log("Report Data")
        // console.log(this.props.type.id)
        let apiResource = "get" + this.props.type.id
        // console.log(apiResource)

        fetchStart();
        dataProvider(GET_LIST, apiResource, {
            pagination: { page: 1, perPage: 10 },
            sort: { field: 'title', order: 'ASC' },
            filter: { startDate: this.state.startDate, endDate: this.state.endDate, selectAssets: this.state.selectedAssets },
        })
            .then((response) => {

                // console.log("report data")
                //  console.log(response)
                this.setState({ reportData: response.json })
                //   console.log(this.state.reportData)

                if (apiResource == 'getDailyAssetRunData') {

                    this.setState({ showDailyAssetRunTable: true })
                }
                if (apiResource == 'getDetailedAssetRunData') {
                    let col = ["Asset Name", "Unit Serial #", "Asset Serial #", "Start Time", "Stop Time", "Duration (Hours)"]
                    this.setState({ detailedAssetRunTableCol: col })
                    this.setState({ showDetailedAssetRunTable: true })
                    //console.log(this.state)

                }

            })
            .catch(error => {
                showNotification(error.message, 'error');
            })
            .finally(() => {
                fetchEnd();
            });
    };


    handleFaultReportData = () => {
        console.log("Fault Report")
        // if( this.state.showAssetRunSummaryReport){
        //     this.setState({showAssetRunSummaryReport:false})
        // }
        // console.log(this.props.type.id)
        let apiResource = "get" + this.props.type.id
        console.log(apiResource)

        this.setState({ showAssetFaultDataReport: true })


        // fetchStart();
        // dataProvider(GET_LIST, apiResource, {
        //     pagination: { page: 1, perPage: 10 },
        //     sort: { field: 'title', order: 'ASC' },
        //     filter: { startDate: this.state.startDate, endDate: this.state.endDate, selectAssets: this.state.selectedAssets },

        // })
        //     .then((response) => {

        //         console.log("report data")
        //       //  console.log(response.json)
        //         this.setState({summaryReportData:response.json})
        //         this.setState({showAssetRunSummaryReport:true})

        //     })
        //     .catch(error => {
        //         showNotification(error.message, 'error');
        //     })
        //     .finally(() => {
        //         fetchEnd();
        //     });
    };


    handleFaultSummary = () => {
        this.setState({ showAssetFaultSummary: true })

    }

    handleWSServiceReport = () => {
        this.setState({ showWSServiceReport: true })

    }

    hanldeDeluxeStationaryReport = () => {
        this.setState({ showDeluxeStationaryReport: true })

    }



    handleReportSummaryData = () => {
        console.log("Summary Report")
        if (this.state.showAssetRunSummaryReport) {
            this.setState({ showAssetRunSummaryReport: false })
        }
        // console.log(this.props.type.id)
        let apiResource = "get" + this.props.type.id
        console.log(apiResource)
        //  this.setState({showAssetRunSummaryReport:true})
        fetchStart();
        dataProvider(GET_LIST, apiResource, {
            pagination: { page: 1, perPage: 10 },
            sort: { field: 'title', order: 'ASC' },
            filter: { startDate: this.state.startDate, endDate: this.state.endDate, selectAssets: this.state.selectedAssets },

        })
            .then((response) => {

                console.log("report data")
                //  console.log(response.json)
                this.setState({ summaryReportData: response.json })
                this.setState({ showAssetRunSummaryReport: true })

            })
            .catch(error => {
                showNotification(error.message, 'error');
            })
            .finally(() => {
                fetchEnd();
            });
    };



    handleChange = prop => event => {
        this.setState({ [prop]: event.target.value });

    };

    handleStartDateChange(e) {
        // console.log("start date")
        let startDate = e.target.value
        this.setState({ startDate })
        // console.log(this.state)
    }
    handleStartDateChange = this.handleStartDateChange.bind(this);


    handleEndDateChange(e) {
        // console.log("end date")
        let endDate = e.target.value
        this.setState({ endDate })

    }
    handleEndDateChange = this.handleEndDateChange.bind(this);


    handleClickSubmit = () => {
        //  console.log("handleClickSubmit")
        //  console.log(this.props)
        if (this.props.type.id == 'AssetUtilizationSummary') {
            this.handleReportSummaryData()
        }
        else if (this.props.type.id == 'AssetFaultData') {
            this.handleFaultReportData()
        }
        else if (this.props.type.id == 'FaultSummary') {
            this.handleFaultSummary()
        }
        else if (this.props.type.id == 'WSServiceReport') {
            this.handleWSServiceReport()
        }
        else if (this.props.type.id == 'DeluxeStationaryReport') {
            this.hanldeDeluxeStationaryReport();
        }
        else {
            this.handleReportData()
        }


        // console.log(this.state)

    };

    render() {
        // console.log("report types")
        console.log(this.props)
        // console.log(this.state.dateRange)
        let reportTitle = '', mainTitle = '';
        if (this.props.type.id == 'DetailedAssetRunData') {
            reportTitle = 'Detailed Asset RunData'
            mainTitle = "Utilization"
        }
        if (this.props.type.id == 'DailyAssetRunData') {
            reportTitle = 'Daily Asset Run Data'
            mainTitle = "Utilization"
        }

        if (this.props.type.id == 'AssetUtilizationSummary') {
            reportTitle = 'Asset Utilization Summary'
            mainTitle = "Utilization"
        }

        if (this.props.type.id == 'AssetFaultData') {
            reportTitle = 'Asset Fault Data'
            mainTitle = "Health"
        }

        if (this.props.type.id == 'FaultSummary') {
            reportTitle = 'Fault Summary'
            mainTitle = "Health"
        }


        if (this.props.type.id == 'WSServiceReport') {
            reportTitle = 'WS Service Report'
            mainTitle = "Custom"
        }


        if (this.props.type.id == 'DeluxeStationaryReport') {
            reportTitle = 'Deluxe Stationary Report'
            mainTitle = "Custom"
        }
        return (
            <Container>
                <Row>
                    <b> <div >{mainTitle + " / " + reportTitle}</div></b>
                    <br />
                </Row>

                <Row>
                    <Paper>
                        <b> <div align="right"><Button label="List Reports" onClick={this.handleBackToList}><ListIcon /></Button></div></b>
                        <form >
                            &nbsp;&nbsp;&nbsp;&nbsp;  Select Date Range: &nbsp;&nbsp; <FormControl >
                                <NativeSelect
                                    defaultValue={"7d"}
                                    input={<Input name="name" id="uncontrolled-native" />}
                                    // value={this.state.age}
                                    onChange={this.handleDateRange}
                                >
                                    <option value={"7d"}>7 days</option>
                                    <option value={"30d"}>30 days</option>
                                    <option value={"90d"}>90 days</option>
                                    <option value={"MTD"}>Month To Date</option>
                                    <option value={"Custom"}>Custom</option>
                                </NativeSelect>
                            </FormControl>

                            &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
                    Select Assets: &nbsp;&nbsp; <FormControl >
                                <InputLabel >Asset</InputLabel>
                                <Select
                                    multiple
                                    value={this.state.selectedAssets}
                                    autoWidth={true}
                                    onChange={this.handleChange('selectedAssets')}
                                    MenuProps={MenuProps}
                                >

                                    {this.state.assets.map(asset => (
                                        <MenuItem key={asset.assetName} value={asset.telematicsSerialNumber}>
                                            {/* <Checkbox checked={this.state.maintenanceStatus.indexOf(maintenance) > -1}/> */}
                                            {/* <ListItemText primary={asset.assetName} /> */}
                                            {asset.assetName}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl >
                            <br />
                            <br />
                            {this.state.dateRange == "Custom" && (
                                <div>
                                    &nbsp;&nbsp;&nbsp;&nbsp;<span>
                                        <TextField
                                            id="startDate"
                                            label="Start Date"
                                            type="date"
                                            // value={this.state.startDate}
                                            onChange={this.handleStartDateChange}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                        &nbsp;&nbsp;&nbsp;&nbsp;
                             <TextField
                                            id="endDate"
                                            label="End Date"
                                            type="date"
                                            // value={this.state.endDate}
                                            onChange={this.handleEndDateChange}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                        &nbsp;&nbsp;&nbsp;&nbsp;
                            </span>
                                    <br />
                                    <br />
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                 </div>
                            )}
                            &nbsp;&nbsp;&nbsp;&nbsp;
                     <Button label="View Report" variant="contained" color="primary" onClick={this.handleClickSubmit}>
                                {/* View Report */}
                            </Button>
                        </form>
                        <br />
                        <br />
                    </Paper>
                </Row>
                <br />
                <br />

                {/*   *** Do Not Remove ***
                 <Row>
                    <Grid label="Bar" item xs={8}>
                        {this.state.showDailyAssetRunTable && (
                            <RandomAnimatedBars />
                        )}
                    </Grid>
                </Row> */}
                <br />
                <br />
                <Row>

                    {this.state.showDailyAssetRunTable && (
                        // <CustomizedTable value={maintenanceValues} />
                        <DynamicTable value={this.state.reportData} />
                    )}

                    {this.state.showAssetFaultDataReport && (
                        // <CustomizedTable value={maintenanceValues} />
                        <DynamicTable value={this.state} />
                    )}

                    {this.state.showDetailedAssetRunTable && (
                        // <CustomizedTable value={maintenanceValues} />
                        <DynamicTable value={this.state} />
                    )}

                    {this.state.showAssetRunSummaryReport && (
                        // <CustomizedTable value={maintenanceValues} />
                        <UtilizationSummary value={this.state.summaryReportData} />
                        // <UtilizationSummary  />

                    )}

                    {this.state.showAssetFaultSummary && (
                        // <CustomizedTable value={maintenanceValues} />
                        <FaultSummary />
                        // <UtilizationSummary  />

                    )}

                    {this.state.showWSServiceReport && (
                        // <CustomizedTable value={maintenanceValues} />
                        <WSReport />
                        // <UtilizationSummary  />

                    )}

                    {this.state.showDeluxeStationaryReport && (
                        // <CustomizedTable value={maintenanceValues} />
                        <DeluxeReport />
                        // <UtilizationSummary  />

                    )}

                </Row>
            </Container>
        );
    }
}

const mapStateToProps = state => ({
    isSubmitting: isSubmitting('post-quick-create')(state)
});

ReportTypes.propTypes = {
    push: PropTypes.func,

};
const mapDispatchToProps = {
    change,
    fetchEnd,
    fetchStart,
    showNotification,
    submit,
    push
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(
    ReportTypes,
    push
));