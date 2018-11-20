import React, { PureComponent } from 'react';
import { Col, Container, Row } from 'reactstrap';
import Card from '@material-ui/core/Card';

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import WSMachineSummaryContainer from './WSMachineSummaryContainer';


const controlParametersData = {
    id:"controlParametersData",
    data:[
    {id:0,name:"Load Pressure",dataValue:0},
    {id:1,name:"Unload Pressure",dataValue:0},
    {id:2,name:"VSD Setpoint",dataValue:0},
    {id:3,name:"Language",dataValue:0},
    {id:4,name:"Modulation",dataValue:0},
    {id:5,name:"Drain Interval",dataValue:0},
    {id:6,name:"Unload Time",dataValue:0},
    {id:7,name:"Restart Time",dataValue:0},
    {id:8,name:"Mode",dataValue:0},
    {id:9,name:"Cost Per KWH",dataValue:0},
    {id:10,name:"Pressure Units",dataValue:0},
    {id:11,name:"Temperature units",dataValue:0},
    
  ]};

  const sequencingParametersData = {
    id:"sequencingParametersData",
    data:[
    {id:0,name:"Low Pressure",dataValue:0},
    {id:1,name:"COM Number",dataValue:0},
    {id:2,name:"Modbus Address",dataValue:0},
    {id:3,name:"Machines",dataValue:0},
    {id:4,name:"Rotate",dataValue:0},
    {id:5,name:"Recovery Time",dataValue:0},
    {id:6,name:"Sequence Hours",dataValue:0},
    {id:7,name:"Sequencing Mode",dataValue:0},

  ]};

  const portEParametersData = {
    id:"portEParametersData",
    data:[
    {id:0,name:"Port E Modbus Address",dataValue:0},
    {id:1,name:"Baud Rate",dataValue:0},
    {id:2,name:"Parity",dataValue:0}

  ]};

  const ethernetParametersData = {
    id:"ethernetParametersData",
    data:[
    {id:0,name:"User IP Address",dataValue:0},
    {id:1,name:"User Gateway Address",dataValue:0},
    {id:2,name:"User Name Server Address",dataValue:0},
    {id:3,name:"User Net Mask Address",dataValue:0},
    {id:4,name:"Service IP address",dataValue:0},
    {id:5,name:"Service Gateway Address",dataValue:0},
    {id:6,name:"Service Name Server Address",dataValue:0},
    {id:7,name:"Service Net Mask Address",dataValue:0},
  ]};


class WSUnitParameters extends PureComponent {

    constructor(props) {
        super(props)
       this.state={
        controlParameters: {
            title: "Control Parameters",
            value: controlParametersData,
            footer: ""
        },
        sequencingParameters: {
            title: "Sequencing Parameters",
            value: sequencingParametersData,
            footer: ""
        },
        ethernetParameters: {
            title: "Ethernet Parameters",
            value: ethernetParametersData,
            footer: ""
        },
        portEParameters: {
            title: "Port E Parameters",
            value: portEParametersData,
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
                        <WSMachineSummaryContainer value={this.state.controlParameters} />
                        </Grid>
                        <br/>
                        <Grid label="Bar" item xs={6}>
                        <WSMachineSummaryContainer value={this.state.sequencingParameters}  />
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
                        <WSMachineSummaryContainer value={this.state.ethernetParameters}  />
                       
                        </Grid>
                        <Grid label="Bar" item xs={6}>
                        <WSMachineSummaryContainer value={this.state.portEParameters}  />
                        </Grid>          
                    </Grid>

                </Row>

            </Container>
        )
    }
}

export default (WSUnitParameters);
