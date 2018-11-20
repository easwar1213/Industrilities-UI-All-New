import React, {PureComponent} from 'react';
import {Card, CardBody, Col} from 'reactstrap';
import {Bar} from 'react-chartjs-2';
//import {translate} from 'react-i18next';

const initialState = {
  labels: ['Aug 08', 'Aug 09', 'Aug 10', 'Aug 11', 'Aug 12', 'Aug 13', 'Aug 14','Aug 15','Aug 19'],
  datasets: [
    {
      label: '1212343457',
      backgroundColor: '#36A2EB',
      borderColor: '#36A2EB',
      borderWidth: 1,
      hoverBackgroundColor: '#36A2EB',
      hoverBorderColor: '#36A2EB',
      data: [0.5, 0.5, 12.5, 3.1, 0.3, 0.3, 3.3, 3.9, 5.6]
    },
    {
     // type:'line',
      label: '1212343456',
      backgroundColor: '#FF6384',
      borderColor: '#FF6384',
      borderWidth: 1,
      hoverBackgroundColor: '#FF6384',
      hoverBorderColor: '#FF6384',
      data: [0.5, 0.5, 12.5, 3.1, 0.3, 0.3, 3.3, 3.9, 5.6]
    }
  ]
};

const options = {
  legend: {
    position: 'bottom'
  },
  scales: {
    xAxes: [
      {
        gridLines: {
          color: 'rgb(204, 204, 204)',
          borderDash: [3, 3]
        },
        ticks: {
          fontColor: 'rgb(204, 204, 204)'
        }
      }
    ],
    yAxes: [
      {
        gridLines: {
          color: 'rgb(204, 204, 204)',
          borderDash: [3, 3]
        },
        ticks: {
          fontColor: 'rgb(204, 204, 204)'
        }
      }
    ]
  }
};

class RandomAnimatedBars extends PureComponent {
  
  constructor(props) {
    super(props);
    this.state = {
      data: initialState
    };
  }
  
  componentDidMount() {
    const _this = this;
    
    _this.setState({initialState})
    // setInterval(function () {
    //   const oldDataSet = _this.state.data.datasets[0];
    //   const newData = [];
      
    //   for (let x = 0; x < _this.state.data.labels.length; x++) {
    //     newData.push(Math.floor(Math.random() * 100));
    //   }
      
    //   const newDataSet = {
    //     ...oldDataSet
    //   };
      
    //   newDataSet.data = newData;
      
    //   const newState = {
    //     ...initialState,
    //     data: {
    //       datasets: [newDataSet],
    //       labels: _this.state.data.labels
    //     }
    //   };
      
    //   _this.setState(newState);
    // }, 4000);
  }
  
  render() {
  

    return (
      // <Col md={6} lg={6} xl={3}>
       // <Card>
        //  <CardBody>
            // <div className='card__title'>
            //   <h5 className='bold-text'>{"Report"}</h5>
            // </div>
            <Bar data={this.state.data} options={options}/>
        //  </CardBody>
      //  </Card>
      // </Col>
    )
  }
}

export default (RandomAnimatedBars);
