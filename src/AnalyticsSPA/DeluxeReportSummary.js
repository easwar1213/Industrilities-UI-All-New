import React, { PureComponent } from 'react';
import { Col, Container, Row } from 'reactstrap';
import Card from '@material-ui/core/Card';

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import WSMachineSummaryContainer from './WSMachineSummaryContainer';
import DeluxeSummaryChart from './DeluxeSummaryChart'


const machineStatisticsData = {
    id:"machineStatisticsData",
    data:[
    {id:0,name:"Machine Hours",dataValue:0},
    {id:1,name:"Compressor Enabled Hours",dataValue:0},
    {id:2,name:"Motor Running Hours",dataValue:0},
    {id:3,name:"Compressor Loaded Hours",dataValue:0},
    {id:4,name:"Compressor Full Load Hours",dataValue:0},
    {id:5,name:"Number of Starts",dataValue:0},
    {id:6,name:"Number of Load Cycles",dataValue:0},
  ]};

  const VSDInformationData = {
    id:"VSDInformationData",
    data:[
    {id:0,name:"Machine Hours",dataValue:0},
    {id:1,name:"Motor Speed",dataValue:0},
    {id:2,name:"Motor Current",dataValue:0},
    {id:3,name:"Drive Temperature",dataValue:0},
    {id:4,name:"DC Link Voltage",dataValue:0},

  ]};

  const FaultInformationData = {
    id:"FaultInformationData",
    data:[
    {id:0,name:"Faults in Last 7 Days",dataValue:0},
    {id:1,name:"Most Recent Fault",dataValue:0}

  ]};

  const VSDPerformanceData = {
    id:"VSDPerformanceData",
    data:[
    {id:0,name:"Capacity",dataValue:0},
    {id:1,name:"Power",dataValue:0},
    {id:2,name:"Hours",dataValue:0},
    {id:3,name:"Total Delivery",dataValue:0},
    {id:4,name:"Total Energy",dataValue:0},
    {id:5,name:"Total Cost",dataValue:0},
    {id:6,name:"Saving vs. Load/Unload ",dataValue:0},
    {id:7,name:"Saving vs. Inlet Modulation ",dataValue:0},
    {id:8,name:"Saving vs. Variable Displacement ",dataValue:0},
  ]};


class DeluxeReportSummary extends PureComponent {

    constructor(props) {
        super(props)
       this.state={
        machineStatistics: {
            title: "Machine Statistics",
            value: machineStatisticsData,
            footer: ""
        },
        VSDInformation: {
            title: "VSD Information",
            value: VSDInformationData,
            footer: ""
        },
        FaultInformation: {
            title: "Fault Information",
            value: FaultInformationData,
            footer: ""
        },
        VSDPerformance: {
            title: "VSD Performance",
            value: VSDPerformanceData,
            footer: ""
        }
       }
  
       // console.log(this.state)

    }

    
    render() {
//console.log(this.props)

        return (
            <Container className='dashboard'>
                {/* <Row>
                    <Col md={12}>
                        <h3 className='page-title'>{"Utilization Summary (in hours)"}</h3>
                    </Col>
                </Row> */}
                <Row>

                    <Grid container spacing={24}>
                        <Grid label="Bar" item xs={6}>
                        <WSMachineSummaryContainer value={this.state.machineStatistics} />
                        </Grid>
                        <br/>
                            <br/>
                        <Grid label="Bar" item xs={6}>
                        <Paper>
                        <DeluxeSummaryChart />
                        </Paper>
                        </Grid>
                    </Grid>

                </Row>
       
            
                {/* <Row>
                    <Col md={12}>
                        <h3 className='page-title'>{"Time Of Day Utilization Summary"}</h3>
                    </Col>
                </Row> */}
                <Row>

                    <Grid container spacing={24}>
                    <Grid label="Bar" item xs={6}>
                        <WSMachineSummaryContainer value={this.state.VSDPerformance}  />
                       
                        </Grid>
                        <Grid label="Bar" item xs={6}>
                        <WSMachineSummaryContainer value={this.state.FaultInformation}  />
                        </Grid>          
                    </Grid>

                </Row>

            </Container>
        )
    }
}

export default (DeluxeReportSummary);
