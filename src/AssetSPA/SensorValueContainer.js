
import React from 'react';
import Card from '@material-ui/core/Card';
import DollarIcon from '@material-ui/icons/AttachMoney';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { translate } from 'react-admin';
import CustomizedTable from './CustomTable';
import CardIcon from './CardIcon';
import Divider from '@material-ui/core/Divider';
import Table from '@material-ui/core/Table';
import Grid from "@material-ui/core/Grid";

const styles = {
    main: {
        flex: '5',
       // marginRight: '1em',
        marginTop: 10,
    },
    card: {
        overflow: 'inherit',
       // textAlign: 'center',
        padding: 16,
        minHeight: 52,
        maxWidth:100
    },
};

const SensorValueContainer = ({ value, translate, classes }) => (
    
        
    <Grid item xs={4}>
        <br/>
        <br/>
     
        <Typography color="textSecondary" >
              <b>  {value.sensorName}</b>
            </Typography>
            <Divider />
            <br/>
            <Typography>
                {value.sensorValue}
            </Typography>
            <br/>
            <Typography  color="textSecondary">
                {value.timeStamp}
            </Typography>
            <br/>
        </Grid>
    
);

export default translate(withStyles(styles)(SensorValueContainer));
