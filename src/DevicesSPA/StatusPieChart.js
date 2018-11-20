import React, { PureComponent } from 'react';

import { Doughnut } from 'react-chartjs-2';
import Paper from "@material-ui/core/Paper";





const getState = (props) => ({
    labels: [
        '% Unavailable',
        '% Avaiable',
    ],


    datasets: [{
        data: (props.value)?[props.value.unavaiableDevicePercentage,props.value.availableDevicePercentage]:[0,0],
        backgroundColor: [
            '#D81B60',
            '#81C784',
        ],
        hoverBackgroundColor: [
            '#D81B60',
            '#81C784',
        ],
        borderColor: 'rgba(255,255,255,0.54)',
        borderWidth: 2,
    }]
});

const options = {
    legend: {
        position: 'left'
    }
}
class StatusPieChart extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            props:props,
            data: getState(props),
            options:options
        };
    }

    componentWillMount() {
        //setInterval(() => {
        this.setState({data: getState(this.props)});
        this.setState({ options: options });

        // }, 4000);
    }

    render() {
        return (
            <div>
                <Doughnut options={this.state.options} data={this.state.data} />
            </div>
        )
    }
}

export default (StatusPieChart);
