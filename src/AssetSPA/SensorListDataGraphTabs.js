import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import SensorDataChart from './SensorDataChart'
function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  
};

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 800,
  },
});

class SensorListDataGraphTabs extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  render() {
      console.log(this.props)
    const { classes, theme ,data,group,asset} = this.props;
    const { value } = this.state;
    let array = [0,1,2]
    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            fullWidth
            centered
          >
            <Tab label="Chart">
          
            </Tab>
            <Tab label="Raw values" />
           
          </Tabs>
        </AppBar>
        {value === 0 && <TabContainer>
       
            <div>
            <TableBody>
            {data.map(item=>{
                 return (
            <TableRow
            key={item}
            >
                    <TableCell>
                    <SensorDataChart asset={asset} group={group} chartValue ={item}/>
                    </TableCell>    
                 </TableRow>  )
            })}     
            </TableBody>    
            </div>
                {/* <TableBody>

                {array.map(n=>{
                     <TableRow>
                    <TableCell>
                   
                    </TableCell>    
                    </TableRow>   
                })}
                </TableBody> */}
                {/* <DeluxeSummaryChart/> */}
          </TabContainer>
         }
        {value === 1 && <TabContainer>Item Two</TabContainer>}

       
      </div>
    );
  }
}

SensorListDataGraphTabs.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(SensorListDataGraphTabs);
