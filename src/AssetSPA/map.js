import React, { PureComponent } from 'react';
import { Card, CardBody, Col, Container, Row } from 'reactstrap';
import { compose, withProps, withStateHandlers } from 'recompose'
import { GoogleMap, Marker, withGoogleMap, withScriptjs, InfoWindow } from 'react-google-maps';
import { InfoBox } from 'react-google-maps/lib/components/addons/InfoBox';
import CloseIcon from 'mdi-react/CloseIcon';
//import data from './smallData.json';
import { fetchStart, fetchEnd, GET_MANY_REFERENCE, showNotification } from 'react-admin';
import dataProvider from '../dataProvider';
import Grid from "@material-ui/core/Grid";
//import {Col, Container, Row} from 'reactstrap';
//import Card from '@material-ui/core/Card';
// Map.
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

let tableData = [], EndDate = '', StartDate = '';
export default class Mymap extends React.Component {

    // State.

    //  state = {markers: []}
    constructor(props) {
        super(props)
        //  console.log(this.props)

        this.state = {
            markers: [],
            maps: [],
            startDate: '',
            endDate: '',

        }

    }

    handleStartDateChange(e) {
        console.log("start date")
       // let startDate = e.target.value
        StartDate =e.target.value;
       // console.log(startDate)
       // this.setState({ startDate })
         console.log(this.state)
    }
    handleStartDateChange = this.handleStartDateChange.bind(this);


    handleEndDateChange(e) {
        console.log("end date")
        //let endDate = e.target.value
       EndDate = e.target.value
       // console.log(endDate)
       // this.setState({ endDate })
          console.log(this.state)
    }
    handleEndDateChange = this.handleEndDateChange.bind(this);



    handleClickSubmit() {
        console.log("Clicked")
         console.log(EndDate)
         console.log(StartDate)
         this.state.endDate =EndDate;
         this.state.startDate = StartDate
        // this.setState({endDate : EndDate})
        // this.setState({startDate : StartDate})
         console.log(this.state)
        // console.log("Clicked")
        this.loadData();
        
    }
    handleClickSubmit = this.handleClickSubmit.bind(this);
    // Render.
    render() {

        // Map With A Marker.
        const MapWithAMarker = compose(
            withProps({
                //generate your API key
                googleMapURL: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyD84CRFR44xSC242F5rPodUZ3CqKbUlqMw&v=3.exp&libraries=geometry,drawing,places',
                loadingElement: <div style={{ height: `100%` }} />,
                containerElement: <div className='map' style={{ height: `500px` }} />,
                mapElement: <div style={{ height: `100%` }} />,
            }),
            withScriptjs,
            withGoogleMap
        )(props =>
            <GoogleMap defaultZoom={10} defaultCenter={{ lat: props.lat, lng: props.lng }}>
                {/* {props.markers.map(props => <AssetMarker key={props.photo_id} {...props}/>)} */}
                {props.maps.map(props => <AssetMarker key={props.id} {...props} />)}
            </GoogleMap>
        )

        // Return Map.
        return (
            <Container>
                <Row>
                    <section id="map">
                        <div className="container">
                            <h3 className="info-title"><span className="info-title-span">Location</span></h3>
                            <div className="row">
                                <div className="col-md-12 text-left">
                                    <MapWithAMarker
                                        //markers={this.state.markers}
                                        maps={this.state.maps}
                                        lat={28.4595}
                                        lng={77.0266}
                                        zoom={10}
                                    />
                                </div>
                            </div>
                            <div className="row text-center">
                            </div>
                        </div>
                    </section>
                </Row>
                <Row>
                    <br />
                    <br />
                    <form noValidate>
                        <span>
                            <TextField
                                id="startDate"
                                label="Start Date"
                                type="date"
                                // value={this.state.startDate}
                                onChange={this.handleStartDateChange}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <TextField
                                id="endDate"
                                label="End Date"
                                type="date"
                                // value={this.state.endDate}
                                onChange={this.handleEndDateChange}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />

                            &nbsp;&nbsp;&nbsp;&nbsp;
                              <Button variant="contained" color="primary" label="Acknowledge" onClick={this.handleClickSubmit}>
                                Submit
                     </Button>
                        </span>
                    </form>
                    <br />

                    <Table >
                        <TableHead>
                            <TableRow>
                                <TableCell numeric>TimeStamp</TableCell>
                                <TableCell numeric>Latitude</TableCell>
                                <TableCell numeric>Longitude</TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tableData.map(row => {
                                return (
                                    <TableRow key={row.id}>
                                        <TableCell numeric>{row.gps.timeStamp}</TableCell>
                                        <TableCell numeric>{row.gps.data.location.lat}</TableCell>
                                        <TableCell numeric>{row.gps.data.location.lon}</TableCell>

                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </Row>

            </Container>
        )

    }

    // Did Mount.
    componentDidMount() {
        this.loadData();
    }


    loadData() {

        const { record} = this.props
        console.log(this.state)
        console.log(this.props)

        fetchStart();
        dataProvider(GET_MANY_REFERENCE, 'getProjectedAssetData', {
            pagination: { page: 1, perPage: 5 },
            sort: { field: 'title', order: 'ASC' },
            filter: { id: record.id, attribute: 'gps', startDate: this.state.startDate, endDate: this.state.endDate },
            target: 'telematicsSerialNumber',
            id: record.telematicsSerialNumber,
            sort: { field: 'created_at', order: 'DESC' }
        })

            .then((response) => {
                //console.log(response.data)

                let maps = response.data
                tableData = response.data
                this.setState({ maps })
                // console.log(this.state)
                // Update the main react-admin form (in this case, the comments creation form)
                // change(REDUX_FORM_NAME, 'post_id', data.id);
                // this.setState({ showDialog: false });
                //showNotification('Maintenance Completed')

            })
            .catch(error => {
                showNotification(error.message, 'error');
            })
            .finally(() => {
                // Dispatch an action letting react-admin know a API call has ended

                fetchEnd();


            });
        // let markers = data.photos

        // this.setState({ markers })

    }

    loadData = this.loadData.bind(this)


}



// AssetMarker.
class AssetMarker extends React.Component {

    // State.
    state = { open: false }

    handleClick = (marker, event) => {
        // console.log({ marker })
        // console.log("clicked")
        //  this.setState({ selectedMarker: marker })
        this.setState({ open: true })
    }

    // Render.
    render() {

        // Extract Props.
        // const {photo_id, latitude, longitude} = this.props
        const { id, gps, timeStamp } = this.props

        // Return Restaurant Marker Component.
        return (



            <Marker key={id} position={{ lat: gps.data.location.lat, lng: gps.data.location.lon }} onMouseOver={() => this.setState(state => ({ open: !state.open }))} onMouseOut={() => this.setState(state => ({ open: !state.open }))}>
                {this.state.open && (
                    <InfoWindow options={{ closeBoxURL: ``, enableEventPropagation: true }}>
                        <div style={{ backgroundColor: `white`, opacity: 1.00, padding: `20px` }}>
                            <div style={{ fontSize: `16px`, fontColor: `#08233B` }} >


                                <b> Location: </b> <span>{gps.data.location.lon} , {gps.data.location.lat} </span>
                                <br />
                                <br />
                                <b> Date: </b> {(new Date(gps.timeStamp)).toDateString()}
                                <br />
                                <br />
                                <b> Speed:</b> 0.00 km/h
                                 <br />
                                <br />
                                <b> Heading:</b> 0˚
                         </div>
                        </div>
                    </InfoWindow>
                )}
            </Marker>

            //     <Marker key={photo_id} position={{ lat: latitude, lng: longitude }} onMouseOver={() => this.setState(state => ({open: !state.open}))}  onMouseOut={() => this.setState(state => ({open: !state.open}))}>
            //     {this.state.open && (
            //           <InfoWindow options={{ closeBoxURL: ``, enableEventPropagation: true }}>
            //           <div style={{ backgroundColor: `white`, opacity: 1.00, padding: `20px` }}>
            //             <div style={{ fontSize: `16px`, fontColor: `#08233B` }} >


            //             <b> Location: </b> <span>{longitude} , {latitude} </span>
            //              <br/>
            //              <br/>
            //             <b> Date: </b> {(new Date()).toDateString()}
            //              <br/>
            //              <br/>
            //             <b> Speed:</b> 0.00 km/h
            //             <br/>
            //              <br/>
            //             <b> Heading:</b> 0˚
            //               </div>
            //           </div>
            //         </InfoWindow>
            //     )}
            //   </Marker>
        )

    }

}