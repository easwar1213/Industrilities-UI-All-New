
import React, { PureComponent } from 'react';
import { Card, CardBody, Col } from 'reactstrap';
import { ComposedChart, LineChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Brush } from 'recharts';



class StatusTrendChart extends PureComponent {
    render() {

        let data =this.props.data;
        console.log(data)
        return (
            <LineChart width={700} height={314} data={data}
                margin={{ top: 20, right: 20, left: 20, bottom: 5 }}>
                <XAxis dataKey="date" />
                <YAxis  />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="Active" stroke="#009688" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="Returned" stroke="#C5CAE9" />
                <Line type="monotone" dataKey="Acknowledged" stroke="#90CAF9" />
                <Brush />
            </LineChart>
        );
    }
}

export default (StatusTrendChart);
