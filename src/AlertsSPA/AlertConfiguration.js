import React from 'react';

import { ShowView, ShowController, BooleanField, ReferenceArrayField, NumberInput, FormDataConsumer, BooleanInput, Labeled, EmailField, ReferenceArrayInput, SelectArrayInput, ArrayInput, SimpleFormIterator, RichTextInput, DateInput, ArrayField, ShowButton, Show, Filter, List, Edit, Create, Datagrid, ReferenceField, TextField, EditButton, DisabledInput, LongTextInput, ReferenceInput, SelectInput, SimpleForm, TextInput, SimpleShowLayout } from 'react-admin';

import { Field, reduxForm } from 'redux-form'



export const AlertConfiguration = (props) => (

    <List title="Alert Configuration" {...props} >
        <Datagrid>
            <TextField source="alertConfigName" />
            <TextField source="triggerCount" />
            <TextField source="assetCount" />
            <ShowButton />
        </Datagrid>
    </List>
);



const PostTitle = ({ record }) => {
    return <span>Alert Coniguration / {record ? `${record.alertConfigName}` : ''}</span>;
};



export const showAlertConfiguration = (props) => (
    <ShowController title={<PostTitle />} {...props}>
        {controllerProps =>
            <ShowView {...props} {...controllerProps}>
                <SimpleShowLayout>
                    <TextField label="Alert Configuration Name" source="alertConfigName" />
                    
                    <br/>
                    <ArrayField label="Notify" source="emails">
                        <Datagrid>
                            <TextField label="Emails" source="email" />
                        </Datagrid>
                    </ArrayField>
                    <br/>
                    <br/>

                    <ReferenceArrayField label="Assets" source="assetsForRef" reference="getAssetListForReference" >
                        <Datagrid>
                            <TextField source="assetName" />
                            <TextField source="model" />
                            <TextField source="telematicsSerialNumber" />
                        </Datagrid>
                    </ReferenceArrayField>

                     <br/>
                    <br/>
                    <ArrayField label="Triggers" source="triggers">
                        <Datagrid>
                            <TextField source="dataPoint" />
                            <TextField source="condition" />

                            <TextField source="value" />
                            <TextField label="For" source="forTimePeriod" />

                             <TextField source="unit" />
                            <TextField source="priority" />

                            <TextField source="autoClear" />
                            <TextField label= "Notify On Return"source="notifyOnReturn" />

                        </Datagrid>
                    </ArrayField>
                </SimpleShowLayout>
            </ShowView>
        }
    </ShowController>
);


export const createAlertConfiguration = (props) => (
    <Create title="Create Alert Configuration" {...props}>
        <SimpleForm redirect="show">
            <TextInput label="Alert Configuration Name" source="alertConfigName" />
            <br />
            <ArrayInput label="Notify (Max 10 emails)" source="emails" >
                <SimpleFormIterator>
                    <TextInput source="email" />
                </SimpleFormIterator>
            </ArrayInput>


            <ReferenceArrayInput label="Pick Assets" source="assets" reference="getAssetListForReference">
                <SelectArrayInput optionText="assetName" />
            </ReferenceArrayInput>



            <ArrayInput label="Triggers" source="triggers" >

                <SimpleFormIterator>

                    <ReferenceInput label="Select Data Point" source="dataPoint" reference="getListOfDataPoints">
                        <SelectInput optionText="id" />
                    </ReferenceInput>


                    <SelectInput label="Condition" source="condition" choices={[
                        { id: '>', name: '>' },
                        { id: '<', name: '<' },
                        { id: '>=', name: '>=' },
                        { id: '<=', name: '<=' },
                        { id: '=', name: '=' },
                        { id: '!=', name: '!=' }
                    ]} />


                    <TextInput source="value" />
                    <NumberInput label="For Time Period" source="forTimePeriod" />
                    <SelectInput label="Unit" source="unit" choices={[
                        { id: 'seconds', name: 'Second(s)' },
                        { id: 'minutes', name: 'Minute(s)' },
                        { id: 'hours', name: 'Hours(s)' }
                    ]} />

                    <SelectInput label="Priority" source="priority" choices={[
                        { id: 'high', name: 'High' },
                        { id: 'medium', name: 'medium' },
                        { id: 'low', name: 'Low' }
                    ]} />

                    <SelectInput label="Auto Clear" source="autoClear" choices={[
                        { id: 'immediately', name: 'Immediately' },
                        { id: 'after24Hours', name: 'After 24 hours' }
                    ]} />

                    <SelectInput label="Notify On Return" source="notifyOnReturn" choices={[
                        { id: 'yes', name: 'Yes' },
                        { id: 'no', name: 'No' }
                    ]} />



                </SimpleFormIterator>

            </ArrayInput>

        </SimpleForm>
    </Create>
);


export const editAlertConfiguration = (props) => (
    <Edit title="Create Alert Configuration" {...props}>
        <SimpleForm redirect="show">
            <TextInput label="Alert Configuration Name" source="alertConfigName" />
            <br />
            <ArrayInput label="Notify (Max 10 emails)" source="emails" >
                <SimpleFormIterator>
                    <TextInput source="email" />
                </SimpleFormIterator>
            </ArrayInput>


            <ReferenceArrayInput label="Pick Assets" source="assetsForRef" reference="getAssetListForReference">
                <SelectArrayInput optionText="assetName" />
            </ReferenceArrayInput>



            <ArrayInput label="Triggers" source="triggers" >

                <SimpleFormIterator>

                    <ReferenceInput label="Select Data Point" source="dataPoint" reference="getListOfDataPoints">
                        <SelectInput optionText="id" />
                    </ReferenceInput>


                    <SelectInput label="Condition" source="condition" choices={[
                        { id: '>', name: '>' },
                        { id: '<', name: '<' },
                        { id: '>=', name: '>=' },
                        { id: '<=', name: '<=' },
                        { id: '=', name: '=' },
                        { id: '!=', name: '!=' }
                    ]} />


                    <TextInput source="value" />
                    <NumberInput label="For Time Period" source="forTimePeriod" />
                    <SelectInput label="Unit" source="unit" choices={[
                        { id: 'seconds', name: 'Second(s)' },
                        { id: 'minutes', name: 'Minute(s)' },
                        { id: 'hours', name: 'Hours(s)' }
                    ]} />

                    <SelectInput label="Priority" source="priority" choices={[
                        { id: 'high', name: 'High' },
                        { id: 'medium', name: 'medium' },
                        { id: 'low', name: 'Low' }
                    ]} />

                    <SelectInput label="Auto Clear" source="autoClear" choices={[
                        { id: 'immediately', name: 'Immediately' },
                        { id: 'after24Hours', name: 'After 24 hours' }
                    ]} />

                    <SelectInput label="Notify On Return" source="notifyOnReturn" choices={[
                        { id: 'yes', name: 'Yes' },
                        { id: 'no', name: 'No' }
                    ]} />



                </SimpleFormIterator>

            </ArrayInput>

        </SimpleForm>
    </Edit>
);