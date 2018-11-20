import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import grey from '@material-ui/core/colors/grey';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Refresh from '@material-ui/icons/Refresh';
import Divider from '@material-ui/core/Divider';
import AlertIcon from '@material-ui/icons/ErrorOutline';
import AckIcon from '@material-ui/icons/ThumbUp';
import ValidityPieChart from './ValidityPieChart'
import ValidityDataTable from './ValidityDataTable'
import {fetchEnd,fetchStart,required,Button,GET_ONE} from 'react-admin';
import dataProvider from '../dataProvider'
import Loader from '../Loader'

const styles = theme => ({
    card: {
        maxWidth: 400,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    actions: {
        display: 'flex',
    },
    expand: {
        transform: 'rotate(0deg)',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
        marginLeft: 'auto',
        [theme.breakpoints.up('sm')]: {
            marginRight: -8,
        },
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: grey[500],
    },
});

class ValidityStatisticsContainer extends React.Component {
    state = { 
        expanded: false ,
        dataTable : '',
        pieChart : '' ,
        isRendering:true
    };

    handleExpandClick = () => {
        this.setState(state => ({ expanded: !state.expanded }));
    };

    componentWillMount(){
        this.loadData();
        
        }
        handleRefresh =() =>{
          this.loadData()
        }
      loadData =() =>{
        fetchStart();
        this.setState({isRendering:true})
        dataProvider(GET_ONE, 'PartValidityStatistics', { id: "PartValidityStatistics" })
              .then((response) => {
                console.log(response)
                let dataTable = response.data.dataTable
                let pieChart = response.data.pieChart
                  this.setState({ pieChart: pieChart });
                  this.setState({ dataTable: dataTable });
                  
                  this.setState({isRendering:false})
              })
              .catch(error => {
                  
              })
              .finally(() => {
                 
                  fetchEnd();
              });
      }
    render() {
        const { classes, avatarAlphabet, headerHeading, pierChartHeading, dataTableSource } = this.props;

        return (
            <Card raised className={classes.card}>
                <CardHeader
                    avatar={
                        <Avatar aria-label="Alerts" className={classes.avatar}>
                            {"V"}
                        </Avatar>
                    }
                    action={
                        <IconButton
                        onClick ={this.handleRefresh}
                        >
                            <Refresh />
                        </IconButton>
                    }
                    title={"Parts Vaidity Statistics"}
                    subheader={"on " + new Date().toLocaleString()}
                />

                <Divider />

                <CardContent>
                    <Typography align="center" component="p">
                        {"% Parts Validity Distribution"}
                    </Typography>
                    <br />
                    {/* <ValidityPieChart /> */}
                    {this.state.isRendering ===true &&(<Loader/>)}
                    {this.state.isRendering ===false &&( <ValidityPieChart value ={this.state.pieChart}/>)}
                </CardContent>

                <Divider />

                <CardActions className={classes.actions} disableActionSpacing>
                    <IconButton
                        className={classnames(classes.expand, {
                            [classes.expandOpen]: this.state.expanded,
                        })}
                        onClick={this.handleExpandClick}
                        aria-expanded={this.state.expanded}
                        aria-label="Show more"
                        label="Show"
                    >
                        <ExpandMoreIcon />
                    </IconButton>
                </CardActions>
                <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography align="center" paragraph>Parts Count</Typography>
                        {/* <ValidityDataTable /> */}
                        {this.state.isRendering ===true &&(<Loader/>)}
                        {this.state.isRendering ===false &&(<ValidityDataTable value ={this.state.dataTable}/>)}    
                    </CardContent>
                </Collapse>
            </Card>
        );
    }
}

ValidityStatisticsContainer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ValidityStatisticsContainer);