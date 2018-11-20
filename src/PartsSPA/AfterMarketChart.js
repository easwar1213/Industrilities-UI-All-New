
import React, {PureComponent} from 'react';
import {Card, CardBody, Col} from 'reactstrap';
import {ComposedChart,LineChart,Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

const data = [
      {name: 'Jan-18', "Revenue($)": 100, },
      {name: 'Feb-18', "Revenue($)": 98,  },
      {name: 'March-18', "Revenue($)": 66, },
      {name: 'April-18', "Revenue($)": 102 },
      {name: 'May-18', "Revenue($)": 150,  },
      {name: 'June', "Revenue($)": 165, }

];


class AfterMarketChart extends PureComponent {
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
          <Bar yAxisId="left"  dataKey="Revenue($)" barSize={20} fill='#413ea0' />
       {/* <Line yAxisId="left" type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{r: 8}}/> */}
      {/* <Line yAxisId="left" type="monotone" dataKey="Avg Run Hours/Day" stroke="#82ca9d" /> */}
    
      </ComposedChart>
    );
  }
}

export default (AfterMarketChart);
