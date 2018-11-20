
import React, { PureComponent } from 'react';
import { Card, CardBody, Col } from 'reactstrap';
import { ComposedChart, LineChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Brush } from 'recharts';

// const data = [
//     { name: '21-Oct', "High": 1 },
//     { name: '22-Oct', "Medium": 3, },
//     { name: '23-Oct', "Low": 6, },


// ];
// const data1 = [
//     { name: '17-Oct', High: 4, Medium: 2, Low: 2},
//     { name: '18-Oct', High: 3, Medium: 1, Low: 3 },
//     { name: '19-Oct', High: 4, Medium: 2, Low: 6 },
//     { name: '20-Oct', High: 3, Medium: 1, Low: 1 },
//     { name: '21-Oct', High: 2, Medium: 9, Low: 0 },
//     { name: '22-Oct', High: 2, Medium: 3, Low: 4 },
//     { name: '23-Oct', High: 1, Medium: 4, Low: 2 },

// ];

class PriorityTrendChart extends PureComponent {

    render() {

         let data =this.props.data;
        console.log(data)
        return (


            <LineChart width={700} height={314} data={data}
                margin={{ top: 20, right: 20, left: 30, bottom: 5 }}>
                <XAxis dataKey="date" />
                <YAxis  />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="High" stroke="#D81B60" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="Medium" stroke="#F4D03F" />
                <Line type="monotone" dataKey="Low" stroke="#757575" />
                <Brush />
            </LineChart>
        );
    }
}

export default (PriorityTrendChart);
