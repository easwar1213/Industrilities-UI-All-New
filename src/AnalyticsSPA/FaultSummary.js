import React, { PureComponent } from 'react';
import { Col, Container, Row } from 'reactstrap';

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import SmallDataPanel from './SmallDataPanel'

import FaultSummaryChart from './FaultSummaryChart';

class FaultSummary extends PureComponent {

    constructor(props) {
        super(props)
    //    let data =this.props.value
       // console.log(data)
    
        this.state = {
            assetFaulting: {
               // title: "Last 7 Days",
               // value: 30,
                value: "1/3 (33%)",
                footer: "Asset Faulting"
            },

            totalFaults: {
              //  title: "Month-To-Date",
                //value: 30,
                 value: 1,
                footer: "Total Faults"
            },

            UniqueFaultCodes: {
               // title: "Last 30 days",
                //value: 30,
                 value: 1,
                footer: "Unique Fault Codes"
            },
            avgFaultPerTotalAssets: {
                //title: "Last 90 Days",
                //value: 30,
                 value: 0.33,
                footer: "Avg Fault Per Total Assets"
            },
            avgFaultPerFaultingAssets :{
                //title:"Assets Reported Data During Period",
                value:1,
                footer: "Avg Fault Per Faulting Assets"
            },
            avgFaultPerFaultingModels:{
               // title:"Average hours per asset per day",
                //value: 30,
                value:1,
                footer: "Avg Fault Per Faulting Models"
            },

            top10FaultingAssets:{
                title:"Top 10 Faulting Assets",
                value:0
               // value:{"Sullair Test3":1},
              //  footer:"hours"
            },

            top10FaultingModels:{
                title:"Top 10 Faulting Models",
                value:"Sullair Test 3"
               // value:{"Model":"LS 90","Count":1,"Asset %":33.33},
              //  footer:"hours"
            }

        };
       // console.log(this.state)

    }

    componentDidMount(){
        
    }

    render() {
//console.log(this.props)

        return (
            <Container className='dashboard'>
                <Row>
                    <Col md={12}>
                        <h3 className='page-title'>{"Fault Summary"}</h3>
                    </Col>
                </Row>
                <Row>

                    <Grid container spacing={24}>
                        <Grid label="Bar" item xs={2}>
                            <SmallDataPanel value={this.state.assetFaulting} />
                        </Grid>
                        <Grid label="Bar" item xs={2}>
                            <SmallDataPanel value={this.state.totalFaults} />
                        </Grid>
                        <Grid label="Bar" item xs={2}>
                            <SmallDataPanel value={this.state.UniqueFaultCodes} />
                        </Grid>
                        {/* <Grid label="Bar" item xs={2}>
                            <SmallDataPanel value={this.state.threeMonth} />
                        </Grid> */}
                    </Grid>

                </Row>
                <br />
                <br />
                <Row>
                    <Grid label="Bar" item xs={8}>
                        <Paper>
                            <br />
                            <b> <div align="center"> &nbsp;&nbsp; Occurrence(s) Per Day  &nbsp;&nbsp;&nbsp;&nbsp; </div> </b>
                            <br />
                            <br />
                            <FaultSummaryChart/>
                        </Paper>
                    </Grid>
                </Row>
                <br />
                
                <Row>
                      <Grid  container spacing={24}  >
                        <Grid label="Bar" item xs={2} >
                            <SmallDataPanel value={this.state.avgFaultPerTotalAssets} />
                        </Grid>
                        <Grid label="Bar" item xs={2} >
                            <SmallDataPanel value={this.state.avgFaultPerFaultingAssets} />
                        </Grid>
                        <Grid label="Bar" item xs={2} >
                            <SmallDataPanel value={this.state.avgFaultPerFaultingModels} />
                        </Grid>
                       
                    </Grid>
                </Row>
                <br/>
                {/* <Row>
                    <Col md={12}>
                        <h3 className='page-title'>{"Time Of Day Utilization Summary"}</h3>
                    </Col>
                </Row> */}
                <Row>

                    <Grid container spacing={24}>
                        <Grid label="Bar" item xs={2}>
                            <SmallDataPanel value={this.state.top10FaultingAssets} />
                        </Grid>
                        <Grid label="Bar" item xs={2}>
                            <SmallDataPanel value={this.state.top10FaultingModels} />
                        </Grid>
                        {/* <Grid label="Bar" item xs={2}>
                            <SmallDataPanel value={this.state.thirdQuarter} />
                        </Grid>
                        <Grid label="Bar" item xs={2}>
                            <SmallDataPanel value={this.state.fourthQuarter} />
                        </Grid> */}
                    </Grid>

                </Row>

            </Container>
        )
    }
}

export default (FaultSummary);
