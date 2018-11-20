import React, { PureComponent } from 'react';

import { Doughnut } from 'react-chartjs-2';
import Paper from "@material-ui/core/Paper";



// function getRandomInt(min, max) {
//     return Math.floor(Math.random() * (max - min + 1)) + min;
// }

const getState = (props) => ({
    
    labels: [
        '% Valid',
        '% Expired',
        '% Replacement Due',
        '% InValid',
    ],


    datasets: [{
        data: (props.value)?[props.value.validPartPercentage,props.value.expiredPartPercentage,props.value.dueForReplacementPartPercentage,props.value.invalidPartPercentage]:[0,0,0,0],
        backgroundColor: [
            '#81C784',
            '#D81B60',
            '#F4D03F',
            '#EAEDED'
        ],
        hoverBackgroundColor: [
            '#81C784',
            '#D81B60',
            '#F4D03F',
            '#EAEDED'
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
class ValidityPieChart extends PureComponent {

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
            console.log(this.props)
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

export default (ValidityPieChart);
