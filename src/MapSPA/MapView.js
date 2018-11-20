import React from 'react';
//import { List, Datagrid, TextField,EmailField, ReferenceField } from 'react-admin';
import { BooleanInput, SimpleShowLayout, SimpleList, ReferenceManyField, ReferenceArrayField, SelectArrayInput, Show, ShowButton, Tab, TabbedShowLayout, Filter, List, Edit, Create, Datagrid, ReferenceField, TextField, EditButton, DisabledInput, LongTextInput, ReferenceInput, SelectInput, SimpleForm, TextInput } from 'react-admin';
import Grid from "@material-ui/core/Grid";
//import Mymap from './map';

import { Card, CardBody, Col, Container, Row } from 'reactstrap';
import Paper from "@material-ui/core/Paper";
import ClusterMapInfo from './ClusterMapInfo'



export const MapView = (props) => (

    <Card>

        <Paper>
            {/* <Row>
                <SimpleModal/>
            </Row>
            <Row> */}
                <ClusterMapInfo />
            {/* </Row> */}
        </Paper>

    </Card>


);