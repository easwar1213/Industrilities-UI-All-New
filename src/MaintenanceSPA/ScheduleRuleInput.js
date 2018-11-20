import React from 'react';
import { Field } from 'redux-form';
import {FormDataConsumer,BooleanInput,NumberInput,Labeled,EmailField,ReferenceArrayInput, SelectArrayInput,ArrayInput, SimpleFormIterator,RichTextInput, DateInput,ArrayField,ShowButton,Show,Filter,List, Edit, Create, Datagrid, ReferenceField, TextField, EditButton, DisabledInput, LongTextInput, ReferenceInput, SelectInput, SimpleForm, TextInput,SimpleShowLayout } from 'react-admin';


export const ScheduleRule = () => (
    <Labeled label="Schedule Rules *">
    <span>
        <NumberInput source="DueEvery" label="Due Every" />
        <SelectInput source="unit" choices={[
                     { id: 'run', name: 'Run Hours' },
                     { id: 'miles', name: 'Miles' },
                     { id: 'km', name: 'Kilometers' }
                 ]} />
    </span>

    <span>
    <BooleanInput source="hasEmail" />
             <FormDataConsumer>
                 {({ formData, ...rest }) => formData.hasEmail &&
                      <TextInput source="email" {...rest} />
                 }
             </FormDataConsumer>
     </span>   
    </Labeled >
);

//export default ScheduleRule;