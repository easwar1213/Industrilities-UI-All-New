import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
});

let id = 0;
function createData(name, calories, fat, carbs, protein) {
  id += 1;
  return { id, name, calories, fat, carbs, protein };
}


const rows1 = [
  createData('Frozen yoghurt', 159,  ),
  createData('Ice cream sandwich', 237),
  createData('Eclair', 262),
  createData('Cupcake', 305),
  createData('Gingerbread', 356),
];

const rows2 = [
  {id:0,name:"Machine Hours",dataValue:0},
  {id:1,name:"Compressor Enabled Hours",dataValue:0},
  {id:2,name:"Motor Running Hours",dataValue:0},
  {id:3,name:"Compressor Loaded Hours",dataValue:0},
  {id:4,name:"Compressor Full Load Hours",dataValue:0},
  {id:5,name:"Number of Starts",dataValue:0},
  {id:6,name:"Number of Load Cycles",dataValue:0},

];


function CustomizedTable(props) {
  const { classes ,value} = props;
  let rows = new Array();
  //if(value.id =="machineStatisticsData" || value.id =="VSDInformationData" || value.id =="FaultInformationData"){
     rows = value.data
  // }
  // else {
  //   rows =rows1
  // }

 // console.log("rows")
 //   console.log(rows)
   // console.log(rows)
  return (
    // <Paper className={classes.root}>
      <Table >
        {/* <TableHead>
          <TableRow>
            <CustomTableCell>Dessert (100g serving)</CustomTableCell>
            <CustomTableCell numeric>Calories</CustomTableCell>
            <CustomTableCell numeric>Fat (g)</CustomTableCell>
            <CustomTableCell numeric>Carbs (g)</CustomTableCell>
            <CustomTableCell numeric>Protein (g)</CustomTableCell>
          </TableRow>
        </TableHead> */}
        <TableBody>
          {rows.map(row => {
            return (
              <TableRow key={row.id}>
                <CustomTableCell component="th" scope="row">
                  {row.name}
                </CustomTableCell>
                <CustomTableCell numeric>{row.dataValue}</CustomTableCell>
                {/* <CustomTableCell numeric>{row.fat}</CustomTableCell> */}
                {/* <CustomTableCell numeric>{row.carbs}</CustomTableCell>
                <CustomTableCell numeric>{row.protein}</CustomTableCell> */}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    // </Paper>
  );
}

CustomizedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomizedTable);
