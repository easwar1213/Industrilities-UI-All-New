
import React, { PureComponent } from 'react';
import { ComposedChart, LineChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Brush } from 'recharts';


class StatusTrendChart extends PureComponent {
    render() {
        let data =this.props.data;
        console.log(data)
        return (

            <LineChart width={750} height={298} data={data}
                margin={{ top: 20, right: 20, left: 30, bottom: 5 }}>
                <XAxis dataKey="name" />
                <YAxis  />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="Unavailable" stroke="#D81B60" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="Available" stroke="#81C784" />
                <Brush />
            </LineChart>
        );
    }
}

export default (StatusTrendChart);
