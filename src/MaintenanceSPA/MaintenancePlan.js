import React from 'react';

import { ShowView, ShowController, BooleanField, ReferenceArrayField, NumberInput, FormDataConsumer, BooleanInput, Labeled, EmailField, ReferenceArrayInput, SelectArrayInput, ArrayInput, SimpleFormIterator, RichTextInput, DateInput, ArrayField, ShowButton, Show, Filter, List, Edit, Create, Datagrid, ReferenceField, TextField, EditButton, DisabledInput, LongTextInput, ReferenceInput, SelectInput, SimpleForm, TextInput, SimpleShowLayout } from 'react-admin';

import { Field, reduxForm } from 'redux-form'

import { ScheduleRule } from './ScheduleRuleInput';

//import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Card, CardBody, Col, Container, Row } from 'reactstrap';

const cardStyle = {
    width: 300,
    minHeight: 80,
    margin: '0.5em',
    display: 'inline-block',
    verticalAlign: 'top'
};



const Title = ({ record }) => {
    return <span>Maintenance Plan</span>;
};
export const MaintenancePlanList = (props) => (

    <List title="Plan" {...props} title={<Title/>}>
        <Datagrid>
            <TextField source="planName" />
            <TextField source="description" />
            <TextField source="tags" />
            <ShowButton />
        </Datagrid>
    </List>
);

const MyActions = ({ record }) => {
    return <span></span>
}

const PostTitle = ({ record }) => {
    return <span>Maintenance Plan / {record ? `"${record.planName}"` : ''}</span>;
};

export const MaintenancePlanShow = (props) => (
    <ShowController title={<PostTitle />} {...props}>
        {controllerProps =>
            <ShowView {...props} {...controllerProps}>
                <SimpleShowLayout>
                    <TextField source="planName" />
                    <TextField source="description" />

                    <ReferenceArrayField label="Assets" source="assets" reference="getAssetListForReference" >
                        <Datagrid>
                            <TextField source="assetName" />
                            <TextField source="model" />
                            <TextField source="telematicsSerialNumber" />
                        </Datagrid>
                    </ReferenceArrayField>

                    <br />
                    <br />
                    <ArrayField label="Notify" source="notify">
                        <Datagrid>
                            <TextField source="email" />
                        </Datagrid>
                    </ArrayField>
                    <br />
                    <br />
                    <br />
                    <TextField label="Schedule Type" source="scheduleType" />
                    <BooleanField label="Meter Based Schedule Rule" source="meterBased" />

                    {/* <Card style={cardStyle} >
                      <CardContent>    */}
                    <SimpleShowLayout>
                        {controllerProps.record && controllerProps.record.meterBased &&
                            <TextField label="Due Every" record={controllerProps.record.m_DueEvery} source="m_DueEvery" />
                        }
                        {controllerProps.record && controllerProps.record.meterBased &&
                            <TextField label="Unit" source="m_unit" />
                        }
                    </SimpleShowLayout>
                    {/* </CardContent>
                      </Card> */}
                    <br />
                    <br />

                    <BooleanField label="Calendar Based Schedule Rule" source="calendarBased" />
                    <SimpleShowLayout>
                        {controllerProps.record && controllerProps.record.calendarBased &&
                            <TextField label="Due Every" source="c_DueEvery" />
                        }
                        {controllerProps.record && controllerProps.record.calendarBased &&
                            <TextField label="Unit" source="c_unit" />
                        }
                    </SimpleShowLayout>

                    <ArrayField source="documentLinks">
                        <Datagrid>
                            <TextField source="name" />
                            <TextField source="description" />
                            <TextField source="url" />
                        </Datagrid>
                    </ArrayField>
                    <TextField source="tags" />




                </SimpleShowLayout>
            </ShowView>
        }
    </ShowController>
);

export const MaintenancePlanEdit = props => (
    <Edit title={<PostTitle />} {...props}>
        <SimpleForm redirect="show" >
            <DisabledInput label="Plan Name *" source="planName" />
            <br />
            <ArrayInput label="Notify (Max 10 emails)" source="notify" >
                <SimpleFormIterator>
                    <TextInput source="email" />
                </SimpleFormIterator>
            </ArrayInput>


            {/* <ScheduleRule/> */}
            <ReferenceArrayInput label="Pick Assets" source="assets" reference="getAssetListForReference">
                <SelectArrayInput optionText="assetName" />

            </ReferenceArrayInput>

            <TextInput label="Tags" source="tags" />
            <TextInput label="Description" source="description" />
            <br />


            <SelectInput label="Schedule Type *" source="scheduleType" choices={[
                { id: 'fixed', name: 'Fixed' },
                { id: 'offset', name: 'Offset' }
            ]} />

            <BooleanInput label="Meter Based Schedule Rule *" source="meterBased" />
            <FormDataConsumer>
                {({ formData, ...rest }) => formData.meterBased &&

                    <span>
                        <NumberInput label="Due Every" source="m_DueEvery" {...rest} />
                        &nbsp;
                        <SelectInput label="Unit" source="m_unit" choices={[
                            { id: 'run', name: 'Run Hours' },
                            { id: 'miles', name: 'Miles' },
                            { id: 'km', name: 'Kilometers' }
                        ]} />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <NumberInput label="Upcoming In" source="m_upcomingIn" /> hours
                    </span>
                }
            </FormDataConsumer>
            <br />

            <BooleanInput label="Calendar Based Schedule Rule *" source="calendarBased" />
            <FormDataConsumer>
                {({ formData, ...rest }) => formData.calendarBased &&

                    <span>
                        <NumberInput label="Due Every" source="c_DueEvery" {...rest} />
                        &nbsp;
                        <SelectInput label="Unit" source="c_unit" choices={[
                            { id: 'days', name: 'Days' },
                            { id: 'weeks', name: 'Weeks' },
                            { id: 'months', name: 'Months' },
                            { id: 'years', name: 'Years' }
                        ]} />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <NumberInput label="Upcoming In" source="c_upcomingIn" /> Days
                    </span>
                }
            </FormDataConsumer>

            <br />
            <br />
            <ArrayInput label="Document Links" source="documentLinks">
                <SimpleFormIterator>
                    <TextInput label="Name" source="name" />
                    <TextInput label="Description" source="description" />
                    <TextInput label="URL" source="url" />
                </SimpleFormIterator>
            </ArrayInput>
        </SimpleForm>
    </Edit>
);

export const MaintenancePlanCreate = (props) => (
    <Create title="Create New Plan" {...props}>
        <SimpleForm redirect="show">
            <TextInput label="Plan Name *" source="planName" />
            <br />
            <ArrayInput label="Notify (Max 10 emails)" source="notify" >
                <SimpleFormIterator>
                    <TextInput source="email" />
                </SimpleFormIterator>
            </ArrayInput>


            {/* <ScheduleRule/> */}
            <ReferenceArrayInput label="Pick Assets" source="assets" reference="getAssetListForReference">
                <SelectArrayInput optionText="assetName" />

            </ReferenceArrayInput>

            <TextInput label="Tags" source="tags" />
            <TextInput label="Description" source="description" />
            <br />


            <SelectInput label="Schedule Type *" source="scheduleType" choices={[
                { id: 'fixed', name: 'Fixed' },
                { id: 'offset', name: 'Offset' }
            ]} />

            <BooleanInput label="Meter Based Schedule Rule *" source="meterBased" />
            <FormDataConsumer>
                {({ formData, ...rest }) => formData.meterBased &&

                    <span>
                        <NumberInput label="Due Every" source="m_DueEvery" {...rest} />
                        &nbsp;
                        <SelectInput label="Unit" source="m_unit" choices={[
                            { id: 'run', name: 'Run Hours' },
                            { id: 'miles', name: 'Miles' },
                            { id: 'km', name: 'Kilometers' }
                        ]} />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <NumberInput label="Upcoming In" source="m_upcomingIn" /> hours
                    </span>
                }
            </FormDataConsumer>
            <br />

            <BooleanInput label="Calendar Based Schedule Rule *" source="calendarBased" />
            <FormDataConsumer>
                {({ formData, ...rest }) => formData.calendarBased &&

                    <span>
                        <NumberInput label="Due Every" source="c_DueEvery" {...rest} />
                        &nbsp;
                        <SelectInput label="Unit" source="c_unit" choices={[
                            { id: 'days', name: 'Days' },
                            { id: 'weeks', name: 'Weeks' },
                            { id: 'months', name: 'Months' },
                            { id: 'years', name: 'Years' }
                        ]} />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <NumberInput label="Upcoming In" source="c_upcomingIn" /> Days
                    </span>
                }
            </FormDataConsumer>

            <br />
            <br />
            <ArrayInput label="Document Links" source="documentLinks">
                <SimpleFormIterator>
                    <TextInput label="Name" source="name" />
                    <TextInput label="Description" source="description" />
                    <TextInput label="URL" source="url" />
                </SimpleFormIterator>
            </ArrayInput>
        </SimpleForm>
    </Create>
);

{/* <ArrayField source="assests">
    <Datagrid>
        <TextField source="assetName" />
        <TextField source="runHours" />
        <TextField source="assetId" />
        <TextField source="startDate" />
    </Datagrid>
</ArrayField> */}

{/* <DateInput label="Publication date" source="published_at" defaultValue={new Date()} /> */ }

{/* <ReferenceArrayInput source="assetName" reference="getAssetList">
<SelectArrayInput optionText="name" />
</ReferenceArrayInput> */}