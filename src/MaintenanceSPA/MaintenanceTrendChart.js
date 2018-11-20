
import React, {PureComponent} from 'react';
import {Card, CardBody, Col} from 'reactstrap';
import {ComposedChart,LineChart,Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

const data = [
      {name: 'May-18', "Due": 10, "Upcoming": 5,},
      {name: 'June-18', "Due": 9, "Upcoming": 3, },
      {name: 'July-18', "Due": 6, "Upcoming": 15,},
      {name: 'Aug-18', "Due": 2 ,"Upcoming": 21,},
      {name: 'Sep-18', "Due": 15, "Upcoming": 1, },
      {name: 'Oct-18', "Due": 1, "Upcoming": 1,}

];


class MaintenanceTrendChart extends PureComponent {
	render () {
      
      // let data =this.props.value;
       //console.log(data)
  	return (
    	<ComposedChart width={400} height={250} data={data}
            margin={{top: 40, right: 30, left: 2, bottom: 1}}>
       <CartesianGrid strokeDasharray="3 3"/>
       <XAxis dataKey="name"/>
       <YAxis   padding={{ top: 20 }} minTickGap={1} yAxisId="left" interval="0"/>
       {/* <YAxis yAxisId="right" orientation="right" /> */}
       <Tooltip/>
        <Legend/>
          <Bar yAxisId="left"  dataKey="Due" barSize={20} fill='red' />
          <Bar yAxisId="left"  dataKey="Upcoming" barSize={20} fill='#F1C40F' />
       {/* <Line yAxisId="left" type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{r: 8}}/> */}
      {/* <Line yAxisId="left" type="monotone" dataKey="Avg Run Hours/Day" stroke="#82ca9d" /> */}
    
      </ComposedChart>
    );
  }
}

export default (MaintenanceTrendChart);
