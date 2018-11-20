import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { change, submit, isSubmitting } from 'redux-form';
import {
    fetchEnd,
    DateInput,
    fetchStart,
    required,
    TextField,
    showNotification,
    Button,
    SaveButton,
    SimpleForm,
    TextInput,
    LongTextInput,
    UPDATE,
    REDUX_FORM_NAME,
    NumberInput
} from 'react-admin';
import IconContentAdd from '@material-ui/icons/Add';
import IconCancel from '@material-ui/icons/Cancel';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import MaintenanceIcon from '@material-ui/icons/Build';
import grey from '@material-ui/core/colors/grey';
import dataProvider from '../dataProvider';
import { push } from 'react-router-redux';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

//import { DateInput, TimeInput, DateTimeInput } from 'react-admin-date-inputs';


let userName = localStorage.getItem('username')
const themeMaintenance = createMuiTheme({
    palette: {
        primary: grey,
    },
});


class Complete extends Component {
    state = {
        error: false,
        showDialog: false
    };

    handleClick = () => {
        this.setState({ showDialog: true });
    };

    handleCloseClick = () => {
        this.setState({ showDialog: false });
    };

    handleSaveClick = () => {
        const { submit } = this.props;

        // Trigger a submit of our custom quick create form
        // This is needed because our modal action buttons are oustide the form
        submit('post-quick-create');
    };

    handleSubmit = values => {
        const { push, change, fetchStart, fetchEnd, showNotification ,record} = this.props;
       
        record.workOrder = values.workOrder;
        record.serviceRunHours = values.runHoursAtService;
        record.serviceDate = values.dateOfService;
        record.completedBy = userName;
        record.status = "completed"
        console.log(record)
        // Dispatch an action letting react-admin know a API call is ongoing
        fetchStart();

        // As we want to know when the new post has been created in order to close the modal, we use the
        // dataProvider directly
        dataProvider(UPDATE, 'updateMaintenanceJob', { data: record })
            .then(() => {
                // Update the main react-admin form (in this case, the comments creation form)
               // change(REDUX_FORM_NAME, 'post_id', data.id);
                this.setState({ showDialog: false });
                showNotification('Maintenance Completed')
               
            })
            .catch(error => {
                showNotification(error.message, 'error');
            })
            .finally(() => {
                // Dispatch an action letting react-admin know a API call has ended
                
                fetchEnd();
                push('/getMaintenance1');
               // console.log("finally")
                push('/getMaintenance');
               
           
            });
    };

    render() {
        const { showDialog } = this.state;
        const { isSubmitting } = this.props;

        return (
            <Fragment>
                <MuiThemeProvider theme={themeMaintenance}>
                <Button   color ="primary"  onClick={this.handleClick} >
                    {/* Complete */}
                    {/* &nbsp; */}
                    <MaintenanceIcon />
                </Button>
                </MuiThemeProvider>
                <Dialog
                    fullWidth
                    open={showDialog}
                    onClose={this.handleCloseClick}
                    aria-label="Create post"
                >
                    <DialogTitle>Complete Maintenance Job</DialogTitle>
                    <DialogContent>
                        <SimpleForm
                            // We override the redux-form name to avoid collision with the react-admin main form
                            form="post-quick-create"
                            resource="posts"
                            // We override the redux-form onSubmit prop to handle the submission ourselves
                            onSubmit={this.handleSubmit}
                            // We want no toolbar at all as we have our modal actions
                            toolbar={null}
                        >
                            <TextInput label ="Work Order #"source="workOrder" validate={required()} />
                            
                            <DateInput label="Date of Service"source="dateOfService" validate={required()} />
                            <NumberInput label="Run Hours at the time of Service" source="runHoursAtService" validate={required()}/>
                            
                   
                        </SimpleForm>
                    </DialogContent>
                    <DialogActions>
                        <SaveButton
                            saving={isSubmitting}
                            onClick={this.handleSaveClick}
                        />
                        <Button label="ra.action.cancel" onClick={this.handleCloseClick}>
                            <IconCancel />
                        </Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    isSubmitting: isSubmitting('post-quick-create')(state)
});

const mapDispatchToProps = {
    change,
    fetchEnd,
    fetchStart,
    showNotification,
    submit,
    push
};

export default connect(mapStateToProps, mapDispatchToProps)(
    Complete
);
