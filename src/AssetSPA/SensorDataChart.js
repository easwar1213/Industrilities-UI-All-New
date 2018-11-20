
import React, {PureComponent} from 'react';
import {Card, CardBody, Col} from 'reactstrap';
import {ComposedChart,LineChart,Bar,Brush, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';




class SensorDataChart extends PureComponent {

  //get Data from Dynamo

	render () {
        const data = [
            {timeStamp: '2018-09-18', sensorValue: 1.7, },
            {timeStamp: '2018-09-19', sensorValue: 1,  },
            {timeStamp: '2018-09-20', sensorValue: 2, },
            {timeStamp: '2018-09-21', sensorValue: 1.5, },
            {timeStamp: '2018-09-22', sensorValue: 0.5, }
      
      ];
       let sensor =this.props.chartValue;
      let group = this.props.group
      let asset = this.props.asset
      console.log(asset+":"+group+":"+sensor)
      
  	return (
    	<ComposedChart width={650} height={250} data={data}
            margin={{top: 7, right: 20, left: 20, bottom: 5}}>
       <CartesianGrid strokeDasharray="3 3"/>
       <XAxis dataKey="timeStamp"/>
       <YAxis   padding={{ top: 20 }} label={{ value:group, angle: -90, position: 'insideBottomLeft' }} yAxisId="left" />
       {/* <YAxis yAxisId="right" orientation="right" /> */}
       <Tooltip/>
      <Legend/>
      <Brush />
      <Line name ={sensor}yAxisId="left"  dataKey="sensorValue" fill='#413ea0' />
          {/* <Bar yAxisId="left"  dataKey="% of Capacity" fill='#413ea0' /> */}
       {/* <Line yAxisId="left" type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{r: 8}}/> */}
      {/* <Line yAxisId="left" type="monotone" dataKey="Avg Run Hours/Day" stroke="#82ca9d" /> */}
    
      </ComposedChart>
    );
  }
}

export default (SensorDataChart);
