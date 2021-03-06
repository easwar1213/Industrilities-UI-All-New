
import React, {PureComponent} from 'react';
import {Card, CardBody, Col} from 'reactstrap';
import {ComposedChart,LineChart,Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

const data = [
      {name: '2018-09-18', "% of Capacity": 0, },
      {name: '2018-09-19', "% of Capacity": 1,  },
      {name: '2018-09-18', "% of Capacity": 0, }

];


class WS_VSD_Charts extends PureComponent {
	render () {
      
      // let data =this.props.value;
       //console.log(data)
  	return (
    	<ComposedChart width={600} height={300} data={data}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}>
       <CartesianGrid strokeDasharray="3 3"/>
       <XAxis dataKey="name"/>
       <YAxis   padding={{ top: 30 }} label={{ value: '% of Motor Running Hours', angle: -90, position: 'insideBottomLeft' }} yAxisId="left" />
       {/* <YAxis yAxisId="right" orientation="right" /> */}
       <Tooltip/>
      <Legend/>
          <Bar yAxisId="left"  dataKey="% of Capacity" fill='#413ea0' />
       {/* <Line yAxisId="left" type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{r: 8}}/> */}
      {/* <Line yAxisId="left" type="monotone" dataKey="Avg Run Hours/Day" stroke="#82ca9d" /> */}
    
      </ComposedChart>
    );
  }
}

export default (WS_VSD_Charts);
