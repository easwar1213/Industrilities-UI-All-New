import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { change, submit, isSubmitting } from 'redux-form';
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import {
    fetchEnd,
    fetchStart,
    required,
    showNotification,
    Button,
    SaveButton,
    SimpleForm,
  
    TextField,
    LongTextInput,
    UPDATE
  
} from 'react-admin';
import SpeakerNotes from '@material-ui/icons/SpeakerNotes';
import IconCancel from '@material-ui/icons/Cancel';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import dataProvider from '../dataProvider';



const themeACK = createMuiTheme({
    palette: {
        primary: grey,
    },
});

class AddCommentButton extends Component {
    state = {
        error: false,
        showDialog: false,
        
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
        const {  fetchStart, fetchEnd, showNotification,record } = this.props;
        // console.log(this.props)
        // console.log(values)
        record.note = values.note
  
        console.log(record)
        // Dispatch an action letting react-admin know a API call is ongoing
        fetchStart();

        // As we want to know when the new post has been created in order to close the modal, we use the
        // dataProvider directly
        dataProvider(UPDATE, 'updateAlert', {  data: record })
            .then(() => {
               // console.log(data)
                // Update the main react-admin form (in this case, the comments creation form)
               // submit(REDUX_FORM_NAME, 'post_id', data.id);
                this.setState({ showDialog: false });
                
            })
            .catch(error => {
                showNotification(error.message, 'error');
            })
            .finally(() => {
                // Dispatch an action letting react-admin know a API call has ended
                fetchEnd();
            });
    };

    render() {
        const { showDialog } = this.state;
        const { isSubmitting ,record} = this.props;
     //   console.log(record)

        return (
            <Fragment>
                <MuiThemeProvider theme={themeACK}>
                <Button  color="primary" onClick={this.handleClick} >
                    <SpeakerNotes />
                </Button>
                </MuiThemeProvider>
                <Dialog
                    fullWidth
                    open={showDialog}
                    onClose={this.handleCloseClick}
                    aria-label="Create post"
                >
                    <DialogTitle>Add Notes</DialogTitle>
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
                            <TextField source={record.alertName}/>
                            {/* <TextInput source="title" validate={required()} /> */}
                            <LongTextInput
                                source="note"
                                validate={required()}
                            />
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
    submit
};

export default connect(mapStateToProps, mapDispatchToProps)(
    AddCommentButton
);