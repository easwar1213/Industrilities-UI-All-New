import React from 'react';
import { BooleanInput, SimpleShowLayout, SimpleList, ReferenceManyField, ReferenceArrayField, SelectArrayInput, Show, ShowButton, Tab, TabbedShowLayout, Filter, List, Edit, Create, Datagrid, ReferenceField, TextField, EditButton, DisabledInput, LongTextInput, ReferenceInput, SelectInput, SimpleForm, TextInput } from 'react-admin';
import Grid from "@material-ui/core/Grid";
import { Card, CardBody, Col, Container, Row } from 'reactstrap';
import Paper from "@material-ui/core/Paper";
import withStyles from '@material-ui/core/styles/withStyles';
import Chip from '@material-ui/core/Chip';
import TableCell from '@material-ui/core/TableCell';
const cellStyle = (record = {}) => {
    console.log("record")
console.log(record)
}




let PartStatusFieldColor = (record, index, defaultStyle = {}) => {
    record =record.record
    if(record.record.partStatus=="Authorized"){
        color ="green"
        return ( <TextField label="Part Status" source="partStatus" style ={{backgroundColor:"green"}} />)
    }
    else if(record.record.partStatus=="Unauthorized"){
        color = "red"
        return ( <TextField label="Part Status" source="partStatus" style ={{backgroundColor:"red"}} />)
    }
}
  

let color ="", record="";

class CellColor  extends React.Component {

    componentDidMount(){
        <PartStatusFieldColor/>
    }
    
    render(){
        console.log()
        return(
            <TableCell style ={{backgroundColor:"red"}}>{record.record.partStatus}</TableCell>
        )

    }
}


const styles = {
    root: {
        backgroundColor: 'red',
    },
};
export const PartsDashboard = withStyles(styles)((props,classes) => {

    return(

    <List title="Parts Dashboard" {...props} filters={<PartsFilter />}  >
        <Datagrid  >
        <TextField label="Part Serial Number" source="partSerialNumber" />
           <TextField label="Part Number" source="partNumber" />
            <TextField label="Tag Id" source="tagId" />
            <TextField label="Telematics Serial Number" source="telematicsSerialNumber" />
            <TextField label="Model" source="model" />
            <TextField label="Gateway Id" source="gatewayId" />
            <TextField label="Life Time (Days)" source="lifeTime" />
          
                <TextField 
                label="Part Status" 
                source="partStatus" 
                headerClassName={classes.root}
                cellClassName={classes.root}
              
                 />
            
             {record.partStatus =="Unauthorized" && (
                <TextField label="Part Status" source="partStatus" style ={{backgroundColor:"red"}} />
            )}
          
            {/* <TextField label="Part Status" source="partStatus" style ={{backgroundColor:color}} /> */}
            <TextField label="Validity" source="validity" />
            <TextField label="Valid Till" source="validTill" />
            <TextField label="Last Reported" source="lastReported" />
        </Datagrid>
    </List>
    )
})
//style={{ background: 'green' }}
const listStyles = {
    comment: {
        maxWidth: '18em',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    },
};




const PartsFilter = (props) => (
    <Filter {...props}>

  <SelectArrayInput label="Part Status" source="partStatus" choices={[
            { id: 'Authorized', name: 'Authorized' },
            { id: 'Unauthorized', name: 'Unauthorized' }
        ]} />
       <SelectArrayInput label="Validity" source="validity" choices={[
            { id: 'Active', name: 'Active' },
            { id: 'Expired', name: 'Expired' },
            { id: 'Renewal Required', name: 'Renewal Required' }
        ]} />

    </Filter>
);