import React from "react";

import ReactTable from "react-table";
import "react-table/react-table.css";


//const ReactTable = window.ReactTable.default
class DynamicTable extends React.Component {

    render() {
      console.log("React Table")
        console.log(this.props)
        let data= new Array(), columns ='', rowsCount=0;

        if(this.props.value.showDetailedAssetRunTable){
        
            data = this.props.value.reportData
           columns = [
                {
                  Header: "Asset Name",
                  accessor:"Asset Name"
                },
                {
            
                      Header:  "Unit Serial #",
                      accessor: "Unit Serial #"
                   
                },
                {
             
                      Header: "Asset Serial #",
                      accessor: "Asset Serial #"
             
                },
                {
             
                    Header:  "Start Time",
                    accessor: "Start Time"
           
              },
               {
             
                      Header: "Start Time",
                      accessor: "Start Time"
             
                },
                {
             
                    Header:  "Duration (Hours)",
                    accessor: "Duration (Hours)"
           
              }
              ]
        }
        else if(this.props.value.showAssetFaultDataReport){
          data = [{"Asset Name":"Sullair Test 3",
                   "Source":145, 
                   "Fault Code":"3362:14",
                   " Code Description":"j1939 Diagnostic Trouble Code",
                  "Date of Fault":"9/24/2018 11:08:54 AM",
                  "Date of Fault Return":"9/24/2018 12:18:23 AM"
                  }]
          columns = [
               {
                 Header: "Asset Name",
                 accessor:"Asset Name"
               },
               {
           
                     Header:  "Source",
                     accessor: "Source"
                  
               },
               {
            
                     Header: "Fault Code",
                     accessor: "Fault Code"
            
               },
               {
            
                   Header:  "Code Description",
                   accessor: "Code Description"
          
             },
              {
            
                     Header: "Date of Fault",
                     accessor: "Date of Fault"
            
               },
               {
            
                   Header:  "Date of Fault Return",
                   accessor: "Date of Fault Return"
          
             }
             ]
        }
        else {
           
            data = this.props.value
            columns = Object.keys(this.props.value[0]).map((key, id)=>{
              return {
                Header: key,
                accessor: key
              }
            })
        }


  
      return <ReactTable
        data = { data}
        columns = { columns }
        defaultPageSize={5}
      />
    }
  }


  export default (DynamicTable);