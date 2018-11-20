import dataProvider from '../dataProvider';

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
//import FlatButton from '@material-ui/core/FlatButton';
//import { FlatButton } from 'material-ui';
import { showNotification, UPDATE ,Button} from 'react-admin';
import classNames from 'classnames';
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
//import Button from '@material-ui/core/Button';

import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';
import grey from '@material-ui/core/colors/grey';
import AlertIcon from '@material-ui/icons/Error';
import ClearIcon from '@material-ui/icons/Clear';
import AckIcon from '@material-ui/icons/ThumbUp';
import { push } from 'react-router-redux';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';


const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    margin: {
        margin: theme.spacing.unit,
    },
    cssRoot: {
        color: theme.palette.getContrastText(purple[500]),
        backgroundColor: purple[500],
        '&:hover': {
            backgroundColor: purple[700],
        },
    },
    bootstrapRoot: {
        boxShadow: 'none',
        textTransform: 'none',
        fontSize: 16,
        padding: '6px 12px',
        border: '1px solid',
        backgroundColor: '#007bff',
        borderColor: '#007bff',
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:hover': {
            backgroundColor: '#0069d9',
            borderColor: '#0062cc',
        },
        '&:active': {
            boxShadow: 'none',
            backgroundColor: '#0062cc',
            borderColor: '#005cbf',
        },
        '&:focus': {
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
        },
    },
});

const themeACK = createMuiTheme({
    palette: {
        primary: grey,
    },
});

const themeCL = createMuiTheme({
    palette: {
        primary: grey,
    },
});


class ApproveButton extends Component {
    handleClickAck = () => {
        const { push, record, showNotification } = this.props;
        const updatedRecord = { ...record, is_approved: true };
        dataProvider(UPDATE, 'updateAlert', { id: record.id, data: updatedRecord, action: "acknowledged" })
            .then(() => {
                showNotification('Alert Acknowledged');
                push('/getAlerts1');
                push('/getAlerts');
            })
            .catch((e) => {
                console.error(e);
                showNotification('Error: comment not approved', 'warning')
            });
    }

    handleClickReturn = () => {
        const { push, record, showNotification } = this.props;
        const updatedRecord = { ...record, is_approved: true };
        dataProvider(UPDATE, 'updateAlert', { id: record.id, data: updatedRecord, action: "cleared" })
            .then(() => {
                showNotification('Alert Cleared');
                push('/getAlerts1');
                push('/getAlerts');
            })
            .catch((e) => {
                console.error(e);
                showNotification('Error: comment not approved', 'warning')
            });
    }

    render() {
        const { push, record, showNotification } = this.props;
        //console.log(record.alertStatus == "acknowledged")
        if (record.alertStatus == "acknowledged") {
            return (
                // <MuiThemeProvider theme={themeCL}>
                //     <Button size="small" variant="outlined" color="primary" label="Clear" onClick={this.handleClickReturn}>
                //         <UndoIcon />
                //     </Button>
                // </MuiThemeProvider>

                <MuiThemeProvider theme={themeCL} >
                    <Button  color="primary" onClick={this.handleClickReturn} >
                    <ClearIcon />
                    </Button>
                </MuiThemeProvider>
            )
        }
        else {
            return (
              
                <MuiThemeProvider theme={themeACK}>            
                    <Button color="primary"  onClick={this.handleClickAck}>
                      <AckIcon/>
                     </Button>
                     </MuiThemeProvider>
                     
             
                // <IconButton label="Acknowledge" color="secondary" onClick={this.handleClickAck} >
                //         <AlertIcon/> 
                //     </IconButton>

            )
        }


    }
}

ApproveButton.propTypes = {
    push: PropTypes.func,
    record: PropTypes.object,
    showNotification: PropTypes.func,
};

export default connect(null, {
    showNotification,
    push,
})(ApproveButton);