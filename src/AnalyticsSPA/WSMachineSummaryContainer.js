
import React from 'react';
import Card from '@material-ui/core/Card';
import DollarIcon from '@material-ui/icons/AttachMoney';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { translate } from 'react-admin';
import CustomizedTable from './CustomTable';
import CardIcon from './CardIcon';

const styles = {
    main: {
        flex: '1',
       // marginRight: '1em',
        marginTop: 10,
    },
    card: {
        overflow: 'inherit',
        textAlign: 'center',
        padding: 16,
        minHeight: 52,
    },
};

const WSMachineSummaryContainer = ({ value, translate, classes }) => (
    <div className={classes.main}>
        {/* <CardIcon Icon={DollarIcon} bgColor="#31708f" /> */}
        <Card className={classes.card}>
     
        <Typography className={classes.title} color="textSecondary">
              <b>  {value.title}</b>
            </Typography>
            <Typography variant="headline" component="h2">
                <CustomizedTable value={value.value}/>
            </Typography>
            <Typography className={classes.title} color="textSecondary">
                {value.footer}
            </Typography>
            {
                
            }
        </Card>
    </div>
);

export default translate(withStyles(styles)(WSMachineSummaryContainer));
