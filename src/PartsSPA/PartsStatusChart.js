import React, {PureComponent} from 'react';
import {Card, CardBody, Col} from 'reactstrap';
import {Doughnut} from 'react-chartjs-2';
import Paper from "@material-ui/core/Paper";

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const getState = () => ({
  labels: [
    'Authprized',
    '%Unauthorized',
   
  ],

  options: {
    legend: {
        display: true,
        labels: {
            fontColor: 'rgb(255, 99, 132)'
        },
        position:'left'
    }
  },
  
  datasets: [{
    data: [75,25],
    backgroundColor: [
      '#63D16C',
      'red',
     
    ],
    hoverBackgroundColor: [
      '#63D16C',
      'red',
     
    ],
    borderColor: 'rgba(255,255,255,0.54)',
    borderWidth	:2,
  }]
});

const options={
  legend: {
    position:'left'
  }
}

class PartsStatusChart extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      data: getState(),
      options:options
    };
  }
  
  componentWillMount() {
 //   setInterval(() => {
      this.setState({data: getState()});
      this.setState({options:options});
  //  }, 4000);
  }
  
  render() {
  

    return (
      
      <Col >
        <Card>
          <CardBody>
            <div className='card__title'>
              <h5 className='bold-text'>{"Parts Status"}</h5>
            </div>
            <Doughnut  options={this.state.options}  data={this.state.data}/>
          </CardBody>
        </Card>
      </Col>
      
    )
  }
}

export default (PartsStatusChart);
