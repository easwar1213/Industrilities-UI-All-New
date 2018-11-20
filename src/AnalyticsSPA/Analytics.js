import React from 'react';

import { BooleanInput, SimpleShowLayout, SimpleList, ReferenceManyField, ReferenceArrayField, SelectArrayInput, Show, ShowButton, Tab, TabbedShowLayout, Filter, List, Edit, Create, Datagrid, ReferenceField, TextField, EditButton, DisabledInput, LongTextInput, ReferenceInput, SelectInput, SimpleForm, TextInput } from 'react-admin';
import Grid from "@material-ui/core/Grid";
import { Card, CardBody, Col, Container, Row } from 'reactstrap';
import Paper from "@material-ui/core/Paper";
import AnalyticsTab from './AnalyticsTabs'
import ReportTypes from './ReportTypes'
import UtilizationSummary from './UtilizationSummary';

const Health = "Health";
const styles = {
    category: { fontWeight: 'bold' },
};

const ReportTitle = ({ record }) => {
    return <span>Assets / {record.reportType ? `${record.subReportType}` : ''}</span>;
};

export const AnalyticsView = (props) => (
    <List title="Analytics" {...props}   >
        <Datagrid >
        <TextField label="Category" source="reportType" />
           <TextField label="Report" source="subReportType" />
            <TextField label="Description" source="description" />
            <ShowButton />
        </Datagrid>
    </List>

);

const MyActions = ({ record }) => {
    return <span></span>
}

export const ShowReport = (props) => (

         <ReportTypes type={props}/>

        // <UtilizationSummary type ={props}/> 
    
   
)

//filter={{ type: "Utilization" }}
//actions={<MyActions />}