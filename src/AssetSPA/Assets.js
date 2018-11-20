import React from 'react';
//import { List, Datagrid, TextField,EmailField, ReferenceField } from 'react-admin';
import { BooleanInput, SimpleShowLayout, SimpleList, ReferenceManyField, ReferenceArrayField, SelectArrayInput, Show, ShowButton, Tab, TabbedShowLayout, Filter, List, Edit, Create, Datagrid, ReferenceField, TextField, EditButton, DisabledInput, LongTextInput, ReferenceInput, SelectInput, SimpleForm, TextInput } from 'react-admin';


//import BestSellingRegions from './BestSellingRegions';
import PinWithInfoWindow from './PinWithInfoWindow';

import Mymap from './map';

import SensorGroupTable from './SensorGroupTable'
export const AssetList = (props) => (
    //perPage={5}sort={{ field: 'telematicsSerialNumber', order: 'DESC' }}
    <List title="Assets" {...props} filters={<AssetFilter />}  >
        <Datagrid>
            <TextField source="telematicsSerialNumber" />
            <TextField source="make" />
            <TextField source="assetName" />
            <TextField source="model" />
            <TextField source="distributorName" />
            <ShowButton />
        </Datagrid>
    </List>
);

const AssetTitle = ({ record }) => {
    return <span>Assets / {record ? `${record.telematicsSerialNumber}` : ''}</span>;
};

export const showAsset = (props) => (

    <Show title={<AssetTitle />} {...props}  >
        <TabbedShowLayout >

            <Tab label="Location" >
                <Mymap vale="check" />
            </Tab>

            <Tab label="Data" >
                <SensorGroupTable value ={props} />
            </Tab>

            <Tab label="Details">
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

            <Tab label="Alerts" filters={<AlertFilter />}>
                <ReferenceManyField filters={<AlertFilter />} filter={{ asset: props.id }} {...props} label="Alerts" target="telematicsSerialNumber" source="telematicsSerialNumber" reference="getAssetAlerts" >

                    {/* <List {...props}filters={<AlertFilter />} filter={{ telematicsSerialNumber:"telematicsSerialNumber"}} title="Alerts"> */}
                    <Datagrid >
                        <TextField source="assetName" />
                        <TextField label="Time Active" source="timeStamp" />
                        <TextField source="alertPriority" />
                        <TextField source="alertStatus" />
                        <TextField source="event" />
                    </Datagrid>
                    {/* </List>  */}
                </ReferenceManyField>
            </Tab>

            <Tab label="Maintenance">
                <ReferenceManyField filters={<AssetFilter />}filter={{ asset: "Asset3"}} label="Maintenance" target="telematicsSerialNumber" source="telematicsSerialNumber" reference="getAssetMaintenance" >
                    <Datagrid>
                        <TextField source="plan" />
                        <TextField source="serviceRunHours" />
                        <TextField source="lastService" />
                        <TextField source="status" />
                        <TextField source="assetName" />
                        {/* <ShowButton /> */}

                    </Datagrid>
                </ReferenceManyField>
            </Tab>
        </TabbedShowLayout>

    </Show >
);

const AssetFilter = (props) => (
    <Filter {...props}>

        <SelectArrayInput label="Maintenance Status" source="maintenanceStatus" choices={[
            { id: 'due', name: 'Due' },
            { id: 'upcoming', name: 'Upcoming' }
        ]} />

        <SelectArrayInput label="Alert Priority" source="alertPriority" choices={[
            { id: 'high', name: 'High' },
            { id: 'medium', name: 'Medium' },
            { id: 'low', name: 'Low' }
        ]} />

        <SelectInput label="Communication" source="communication" choices={[
            { id: 'c_1', name: 'Communicated Within 24 Hour' },
            { id: 'c_7', name: 'Communicated Within 7 days' },
            { id: 'c_30', name: 'Communicated Within 30 days' },
            { id: 'n_1', name: 'Not Communicated Within 24 Hour' },
            { id: 'n_7', name: 'Not Communicated Within 7 days' },
            { id: 'n_30', name: 'Not Communicated Within 30 days' },
            { id: 'o_0', name: 'Not Communicated Ever' }
        ]} />

    </Filter>
);


const AlertFilter = (props) => (
    <Filter {...props}>

        <SelectArrayInput label="Status" source="alertStatus" choices={[
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
//filter={{ is_published: true }}