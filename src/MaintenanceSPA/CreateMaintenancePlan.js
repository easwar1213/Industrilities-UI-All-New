import React from 'react';

import {RichTextInput, DateInput,ArrayField,ShowButton,Show,Filter,List, Edit, Create, Datagrid, ReferenceField, TextField, EditButton, DisabledInput, LongTextInput, ReferenceInput, SelectInput, SimpleForm, TextInput,SimpleShowLayout } from 'react-admin';

export const MaintenancePlanCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="planName" />
            <TextInput source="teaser" options={{ multiLine: true }} />
            <TextInput source="description" />
            <DateInput label="Publication date" source="published_at" defaultValue={new Date()} />
        </SimpleForm>
    </Create>
);
