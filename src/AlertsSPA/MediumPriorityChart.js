import React, {PureComponent} from 'react';
import {Card, CardBody, Col,CardText} from 'reactstrap';
import {Doughnut} from 'react-chartjs-2';
import Paper from "@material-ui/core/Paper";

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const getState = () => ({
  labels: [
    '% Medium Alerts',
  
  ],

  options: {
    legend: {
        display: false,
        labels: {
            fontColor: 'rgb(255, 99, 132)'
        },
        position:'top'
    }
  },
  datasets: [{
    data: [16.66,83.33],
    backgroundColor: [
      '#F4D03F',
     
      '#EAEDED'
    ],
    hoverBackgroundColor: [

      '#F4D03F',
    
      '#EAEDED'
    ],
    borderColor: 'rgba(255,255,255,0.54)',
    borderWidth	:2,
  }]
});

const options={
  legend: {
    position:'top'
  }
}
class MediumPriorityChart extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      data: getState(),
      options:options
    };
  }
  
  componentWillMount() {
    //setInterval(() => {
      this.setState({data: getState()});
      this.setState({options:options});
      
   // }, 4000);
  }
  
  render() {
  

    return (
      
      <Col >
        <Card>
          <CardBody>
            <Doughnut options={this.state.options}  data={this.state.data}/>
            <div className="bg-info clearfix" style={{ padding: '.5rem' }}>
          <CardText >&nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; 
          &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;Medium Priority: 1</CardText>
         </div>
          </CardBody>
        </Card>
      </Col>
      
    )
  }
}

export default (MediumPriorityChart);
