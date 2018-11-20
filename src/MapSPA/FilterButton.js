import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { change, submit, isSubmitting } from 'redux-form';
import {
    fetchEnd,
    fetchStart,
    required,
    showNotification,
    Button,
    GET_LIST,
    SaveButton,
    SimpleForm,
    TextInput,
    TextField,
    LongTextInput,
    UPDATE,
    REDUX_FORM_NAME,
    ArrayInput,
    SimpleFormIterator,
    SelectInput,
    SelectArrayInput,
    ReferenceArrayInput,
    ReferenceInput
} from 'react-admin';
import classNames from 'classnames';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import SpeakerNotes from '@material-ui/icons/SpeakerNotes';
import IconCancel from '@material-ui/icons/Cancel';
import FilterList from '@material-ui/icons/FilterList';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';

import dataProvider from '../dataProvider';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const maintenanceValues = [

    {
        value: 'due',
        label: 'Due',
    },
    {
        value: 'upcoming',
        label: 'Upcoming',
    },

];
const alertValues = [
    {
        value: 'low',
        label: 'Low',
    },
    {
        value: 'medium',
        label: 'Medium',
    },
    {
        value: 'high',
        label: 'High',
    },
];



class FilterButton extends Component {
    state = {
        error: false,
        showDialog: false,
        maintenanceStatus: [],
        alertPriority: [],
    };


    handleChange = prop => event => {
        this.setState({ [prop]: event.target.value });

    };

    handleClick = () => {
        this.setState({ showDialog: true });
    };

    handleCloseClick = () => {
        this.setState({ showDialog: false });
    };

    handleSaveClick = () => {
        console.log("saveClick")
        const { submit } = this.props;

        // Trigger a submit of our custom quick create form
        // This is needed because our modal action buttons are oustide the form
        submit('filter-form');
    };

    handleSubmit = values => {
        // const { change, fetchStart, fetchEnd, showNotification,record } = this.props;
        // console.log(this.props)
        let childData ={
            values:values,
            childState: this.state
        }
        console.log(values)
        console.log(this.state)
        this.props.action(childData);
        this.handleCloseClick();
        // Dispatch an action letting react-admin know a API call is ongoing
        // fetchStart();

        // // As we want to know when the new post has been created in order to close the modal, we use the
        // // dataProvider directly
        // dataProvider( GET_LIST, 'getMapViewData', {  data: record })
        //     .then(() => {
        //        // console.log(data)
        //         // Update the main react-admin form (in this case, the comments creation form)
        //        // submit(REDUX_FORM_NAME, 'post_id', data.id);
        //         this.setState({ showDialog: false });

        //     })
        //     .catch(error => {
        //         showNotification(error.message, 'error');
        //     })
        //     .finally(() => {
        //         // Dispatch an action letting react-admin know a API call has ended
        //         fetchEnd();
        //     });
    };

    render() {
        const { showDialog } = this.state;
        const { isSubmitting, record } = this.props;
        //   console.log(record)

        return (
            <Fragment>
                <Button label="Filter" onClick={this.handleClick} >
                    <FilterList />
                </Button>
                <Dialog
                    fullWidth
                    open={showDialog}
                    onClose={this.handleCloseClick}
                    aria-label="Create post"
                >
                    <DialogTitle>Add Filter</DialogTitle>
                    <DialogContent>
                        <SimpleForm
                            // We override the redux-form name to avoid collision with the react-admin main form
                            form="filter-form"
                            resource="posts"
                            // We override the redux-form onSubmit prop to handle the submission ourselves
                            onSubmit={this.handleSubmit}
                            // We want no toolbar at all as we have our modal actions
                            toolbar={null}
                        >
                            {/* <TextField source={record.alertName}/> */}
                            <FormControl >
                                <InputLabel htmlFor="select-multiple-checkbox">Alert</InputLabel>
                                <Select
                                    multiple

                                    value={this.state.alertPriority}
                                    onChange={this.handleChange('alertPriority')}
                                    input={<Input id="select-multiple-checkbox" />}
                                    renderValue={selected => selected.join(', ')}
                                    MenuProps={MenuProps}
                                >
                                    {alertValues.map(alert => (

                                        <MenuItem key={alert.value} value={alert.value}>
                                            {/* <Checkbox checked={this.state.alertValues.indexOf(alert) > -1} /> */}
                                            <ListItemText primary={alert.value} />
                                        </MenuItem>

                                    ))}
                                </Select>
                            </FormControl>
                            <br />
                            <FormControl>
                                <InputLabel htmlFor="select-multiple-checkbox">Maintenance</InputLabel>
                                <Select
                                    multiple

                                    value={this.state.maintenanceStatus}
                                    onChange={this.handleChange('maintenanceStatus')}
                                    input={<Input id="select-multiple-checkbox" />}
                                    renderValue={selected => selected.join(', ')}
                                    MenuProps={MenuProps}
                                >
                                    {maintenanceValues.map(maintenance => (

                                        <MenuItem key={maintenance.value} value={maintenance.value}>
                                            {/* <Checkbox checked={this.state.maintenanceStatus.indexOf(maintenance) > -1}/> */}
                                            <ListItemText primary={maintenance.value} />
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <ArrayInput label="Add Attribute Filter" source="attributes" >
                                <SimpleFormIterator>
                                    <ReferenceInput label="Attribute" source="dataPoint" reference="getListOfAttributes">
                                        <SelectInput optionText="id" />
                                    </ReferenceInput>
                                    <TextInput source="value" />
                                   
                                </SimpleFormIterator>
                            </ArrayInput>
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
    isSubmitting: isSubmitting('filter-form')(state)
});

const mapDispatchToProps = {
    change,
    fetchEnd,
    fetchStart,
    showNotification,
    submit
};

export default connect(mapStateToProps, mapDispatchToProps)(
    FilterButton
);