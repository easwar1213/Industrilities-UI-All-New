import React from 'react';
import { BooleanInput, SimpleShowLayout, SimpleList, ReferenceManyField, ReferenceArrayField, SelectArrayInput, Show, ShowButton, Tab, TabbedShowLayout, Filter, List, Edit, Create, Datagrid, ReferenceField, TextField, EditButton, DisabledInput, LongTextInput, ReferenceInput, SelectInput, SimpleForm, TextInput } from 'react-admin';
import Grid from "@material-ui/core/Grid";
import { Card, CardBody, Col, Container, Row } from 'reactstrap';
import Paper from "@material-ui/core/Paper";
import CustomerAssets from './CustomerAssets'
export const PartsCustomerView = (props) => (
    <List title="Customers" {...props}   >
        <Datagrid >
        <TextField label="Customer Name" source="customerName" />
           <TextField label="Asset Count" source="assetCount" />
            <TextField label="% Unauthorised parts" source="description" />
            <TextField label="% Expired parts" source="description" />
            <TextField label="% Active parts" source="description" />
            <ShowButton />
        </Datagrid>
    </List>

);

export const ShowCustomerAssets = (props) => (

<CustomerAssets customer={props.id} />

)

//pending
const CustomerFilter = (props) => (
    <Filter {...props}>

        <SelectArrayInput label="customer" source="customerName" choices={[
            { id: 'active', name: 'Active' },
            { id: 'returned', name: 'Returned' },
            { id: 'acknowledged', name: 'Acknowledged' }
        ]} />

        <SelectArrayInput label="Priority" source="alertPriority" choices={[
            { id: 'high', name: 'High' },
            { id: 'medium', name: 'Medium' },
            { id: 'low', name: 'Low' }
        ]} />

        <SelectArrayInput label="Type" source="alertType" choices={[
            { id: 'alert', name: 'Alert' },
            { id: 'fault', name: 'Fault' },
            { id: 'geozones', name: 'GeoZones' }
        ]} />

    </Filter>
);