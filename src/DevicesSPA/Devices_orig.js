import React from 'react';

import {Tab, TabbedShowLayout,ShowView, ShowController, BooleanField, ReferenceArrayField, NumberInput, FormDataConsumer, BooleanInput, Labeled, EmailField, ReferenceArrayInput, SelectArrayInput, ArrayInput, SimpleFormIterator, RichTextInput, DateInput, ArrayField, ShowButton, Show, Filter, List, Edit, Create, Datagrid, ReferenceField, TextField, EditButton, DisabledInput, LongTextInput, ReferenceInput, SelectInput, SimpleForm, TextInput, SimpleShowLayout } from 'react-admin';

import { Field, reduxForm } from 'redux-form'



export const DeviceList = (props) => (

    <List title="Devices" {...props} perPage={5} sort={{ field: 'telematicsSerialNumber', order: 'DESC' }} >
        <Datagrid>
            <TextField label="Status" source="avaiabilityStatus" />
            <TextField label="Serial#" source="telematicsSerialNumber" />
            <TextField label="Device" source="model" />
            <TextField label="Asset" source="assetName" />
            <TextField label="Last Comm." source="lastCommunicated" />
            <ShowButton />
        </Datagrid>
    </List>
);

const DeviceTitle = ({ record }) => {
    return <span>Device / {record ? `${record.telematicsSerialNumber}` : ''}</span>;
};
export const showDevice = (props) => (

    <Show title={<DeviceTitle />} {...props}  >

        <TabbedShowLayout>
            <Tab label="Device Details">
                <TextField label="Telematics Serial Number" source="telematicsSerialNumber" />
                <TextField label="Device Model" source="model" />
                <TextField label="Activation Date" source="activatedDate" />
                <TextField label="Last Communication" source="lastCommunicated" />
            </Tab>

            <Tab label="Asset Details">
                <TextField label="Name" source="assetName" />
                <TextField label="Model" source="model" />
                <TextField label="Make" source="make" />
                <TextField label="Model Year" source="modelYear" />
                <TextField label="Compressor Controller" source="compressorController" />
                <TextField label="Compressor Type" source="compressorType" />
                <TextField label="Distributor Name" source="distributorName" />
                <TextField label="Motor HP" source="motorHP" />
                <TextField label="Nominal Package FlowRating" source="nominalPackageFlowRating" />
            </Tab>
        </TabbedShowLayout>

    </Show>
);