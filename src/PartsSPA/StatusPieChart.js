import React, { PureComponent } from 'react';

import { Doughnut } from 'react-chartjs-2';
import Paper from "@material-ui/core/Paper";




const getState = (props) => ({
    labels: [
        '% Authorised',
        '% Unathorised',
    ],


    datasets: [{
        data: (props.value)?[props.value.authorisedPartPercentage,props.value.unauthorisedPartPercentage]:[0,0],
        backgroundColor: [
            '#81C784',
            '#D81B60',
        ],
        hoverBackgroundColor: [
            '#81C784',
            '#D81B60',
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
            options: options
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
