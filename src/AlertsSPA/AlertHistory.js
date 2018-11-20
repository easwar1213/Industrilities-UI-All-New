import React from 'react';
//import { List, Datagrid, TextField,EmailField, ReferenceField } from 'react-admin';
import { ReferenceArrayInput,DateInput, SelectArrayInput, Filter, List, Edit, Create, Datagrid, ReferenceField, TextField, EditButton, DisabledInput, LongTextInput, ReferenceInput, SelectInput, SimpleForm, TextInput } from 'react-admin';

const AlertFilter = (props) => (
    <Filter {...props}>

        <SelectArrayInput label="Status" source="alertStatus" choices={[
            { id: 'active', name: 'Active' },
            { id: 'returned', name: 'Returned' },
            { id: 'acknowledged', name: 'Acknowledged' },
            { id: 'cleared', name: 'Cleared' }
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

        
        <DateInput source="startDate" />
        <DateInput source="endDate" />
      


        <ReferenceArrayInput label="Pick Assets" source="assets" reference="getAssetListForReference">
            <SelectArrayInput optionText="assetName" />

        </ReferenceArrayInput>

    </Filter>
);

export const AlertsHistory = (props) => (

    <List title="Historical Alerts" {...props} filters={<AlertFilter />} perPage={10}>
        <Datagrid>
            
            {/* <ReferenceField label="Asset Name" source="assetId" reference="getAssetListForReference">
                <TextField source="assetName" />
            </ReferenceField> */}
            <TextField source="assetName" />
            <TextField label="Time Active" source="timeStamp" />
            <TextField source="alertPriority" />
            <TextField source="alertStatus" />
            <TextField source="event" />
        </Datagrid>
    </List>
);


// export const DateFilterForm = (props) => (
//     <Create title="Historical Alerts" {...props}>
//         <SimpleForm redirect="show">
//             <DateInput source="startDate" />
//             <DateInput source="endDate" />
//         </SimpleForm>
//     </Create>
// );
