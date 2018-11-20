import React, {PureComponent} from 'react';
import {Card, CardBody, Col,CardText} from 'reactstrap';
import {Doughnut} from 'react-chartjs-2';
import Paper from "@material-ui/core/Paper";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';


function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const styles = {
    card: {
      maxWidth: 675,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  };

  
const getState = () => ({
  labels: [
    '% Due Assets',
   
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
    data: [50,50],
    backgroundColor: [
      'red',
     
      '#EAEDED'
    ],
    hoverBackgroundColor: [

      'red',
    
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
class MaintenanceDueChart extends PureComponent {

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
  
    const { classes } = this.props;
    return (
      
      <Col >
     
        <Card className={classes.card}>
        
          <CardBody>
              <span>
              <div>
            <Doughnut options={this.state.options}  data={this.state.data}/>
            <div className="bg-info clearfix" style={{ padding: '.5rem' }}>
          <CardText >&nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; 
          &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;Due Assets: 1</CardText>
        </div>
        <div>
  
        </div>  
        </div> 
        </span> 
          </CardBody>
        </Card>
       
      </Col>
      
    )
  }
}

MaintenanceDueChart.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
export default withStyles(styles) (MaintenanceDueChart);
