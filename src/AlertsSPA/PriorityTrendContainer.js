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
import PriorityTrendChart from './PriorityTrendChart'
import {fetchEnd,fetchStart,required,Button,GET_LIST} from 'react-admin';
import dataProvider from '../dataProvider'
import Loader from '../Loader'

const styles = theme => ({
    card: {
        minWidth: 700,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    actions: {
        display: 'flex',
    },

});

class PriorityTrendContainer extends React.Component {
    state = { 
        expanded: false ,
        isRendering:true,
        Data: []
    };

    handleExpandClick = () => {
        this.setState(state => ({ expanded: !state.expanded }));
    };

    handleRefresh =() =>{
        this.loadData()
    }
    componentWillMount(){
        this.loadData()
    }

    loadData =() =>{
        fetchStart();
        this.setState({isRendering:true})
        //(GET_ONE, 'AlertPriorityTrend', { id: "AlertPriorityTrend" })
        dataProvider(GET_LIST, 'AlertPriorityTrend', {
            pagination: { page: 1, perPage: 5 },
            sort: { field: 'title', order: 'DESC' },
            filter: { 
                id: "AlertPriorityTrend",
                dateRange:1, //or 7 or 30 days,
            },
        })
              .then((response) => {
                  this.setState({ Data: response.data });
                 // console.log(this.state.Data)
                   this.setState({isRendering:false})
              })
              .catch(error => {
                  console.log(error)
                this.setState({isRendering:false})
              })
              .finally(() => {
                 
                  fetchEnd();
                  this.setState({isRendering:false})
              });
      }

    render() {
        const { classes, avatarAlphabet, headerHeading, pierChartHeading, dataTableSource } = this.props;

        return (
            <Card classes={classes.card} >
                <CardHeader
                    avatar={
                        <Avatar classes={classes.avatar} >
                            S
                        </Avatar>
                    }
                    action={
                        <IconButton
                        onClick = {this.handleRefresh}
                        >
                            <Refresh />
                        </IconButton>
                    }

                    title="Alert Priority Trend"
                    subheader={"Count of Assets with different Alert Priority"}
                />
                <Divider />
                {this.state.isRendering === true && (<Loader/>)}
                {this.state.isRendering ===false &&(<PriorityTrendChart data ={this.state.Data}/>)}
                
            </Card>
        );
    }
}

PriorityTrendContainer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PriorityTrendContainer);