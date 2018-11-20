import React, { PureComponent } from 'react';
import { Card, CardBody, Col, Container, Row } from 'reactstrap';
import { compose, withProps, withStateHandlers } from 'recompose'
import { GoogleMap, Marker, withGoogleMap, withScriptjs, InfoWindow, withHandlers } from 'react-google-maps';
import { InfoBox } from 'react-google-maps/lib/components/addons/InfoBox';
import { MarkerClusterer } from 'react-google-maps/lib/components/addons/MarkerClusterer';
import CloseIcon from 'mdi-react/CloseIcon';
import data from './data.json';
import dump from './dump.json'
import { fetchStart, fetchEnd, GET_LIST, GET_MANY_REFERENCE,showNotification } from 'react-admin';
import dataProvider from '../dataProvider';
import Grid from "@material-ui/core/Grid";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FilterButton from './FilterButton';
//import { max } from 'date-fns/esm';


let tableData = [], EndDate = '', StartDate = '';

export default class Mymap extends React.Component {

    // State.

    //  state = {markers: []}
    constructor(props) {
        super(props)
        //  console.log(this.props)

        this.state = {
            markers: [],
            assets:[],
            maps: [],
            startDate: '',
            endDate: '',

        }


    }

    
    handleStartDateChange(e) {
        console.log("date")
        let startDate = e.target.value
        this.setState({ startDate })
        // console.log(this.state)
    }
    handleStartDateChange = this.handleStartDateChange.bind(this);


    handleEndDateChange(e) {
        console.log("date")
        let endDate = e.target.value
        this.setState({ endDate })
        //  console.log(this.state)
    }
    handleEndDateChange = this.handleEndDateChange.bind(this);



    // handleClickSubmit() {
        
    //     this.loadData();
        
    // }
    // handleClickSubmit = this.handleClickSubmit.bind(this);



    handleClickSubmitOnChild(childProps) {
     
        console.log(childProps)
        fetchStart();
        dataProvider(GET_LIST, 'getMapViewData', {
            pagination: { page: 1, perPage: 10 },
            sort: { field: 'title', order: 'ASC' },
            filter: { maintenance: childProps.childState.maintenanceStatus,
                alert:childProps.childState.alertPriority,
            attributes: childProps.values.attributes },
        })
            .then((response) => {
               
                let assets =response.data
                this.setState({assets:assets})
                console.log(assets)
              //  let markers = data.photos
                this.setState({ markers: assets })
             
            })
            .catch(error => {
                showNotification(error.message, 'error');
            })
            .finally(() => {
                fetchEnd();
            });

       
    }
    handleClickSubmitOnChild = this.handleClickSubmitOnChild.bind(this);
    

    componentDidMount() {
        console.log("componentDidMount")
        //let markers = data.photos
        let markers = dump.photos
        this.setState({ markers: markers })
        console.log(this.state)
    }
    // Render.
    render() {

        // Map With A Marker.
        const MapWithAMarker = compose(
            withProps({
                //generate your API key
                googleMapURL: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyD84CRFR44xSC242F5rPodUZ3CqKbUlqMw&v=3.exp&libraries=geometry,drawing,places',
                loadingElement: <div style={{ height: `100%` }} />,
                containerElement: <div className='map' style={{ height: `625px` }} />,
                mapElement: <div style={{ height: `100%` }} />,
            }),
            withScriptjs,
            withGoogleMap
        )(props =>
            <GoogleMap defaultZoom={3} defaultCenter={{ lat: props.lat, lng: props.lng }}>

                <MarkerClusterer
                    onClick={props.onMarkerClustererClick}
                    averageCenter
                    enableRetinaIcons
                    gridSize={60}
                    styles={[
                        {
                            url: process.env.PUBLIC_URL + '/img/map_markers/m1.png',
                            height: 53,
                            width: 53
                        },
                        {
                            url: process.env.PUBLIC_URL + '/img/map_markers/m1.png',
                            height: 56,
                            width: 56
                        },
                        {
                            url: process.env.PUBLIC_URL + '/img/map_markers/m1.png',
                            height: 66,
                            width: 66
                        },
                        {
                            url: process.env.PUBLIC_URL + '/img/map_markers/m1.png',
                            height: 78,
                            width: 78
                        },
                        {
                            url: process.env.PUBLIC_URL + '/img/map_markers/m1.png',
                            height: 90,
                            width: 90
                        },
                    ]}
                >
                    {console.log(props)}
                    {props.markers.map(props => <AssetMarker key={props.telematicsSerialNumber} {...props} />)}
                    {/* {props.maps.map(props => <AssetMarker key={props.id} {...props} />)} */}
                </MarkerClusterer>
            </GoogleMap>
        )

        // Return Map.
        return (
            <Container style={{  minHeight: '86vh'}} fluid={true}>
                <Row>
                {/* <SimpleModal action ={this.handleClickSubmitOnChild}/> */}
                <FilterButton action ={this.handleClickSubmitOnChild} />
                </Row>    
                <Row>
                    <section id="map">
                        <div className="container">
                            <h3 className="info-title"><span className="info-title-span"></span></h3>
                            <div className="row">
                                <div className="col-md-12 text-left">
                                    <MapWithAMarker
                                        markers={this.state.markers}
                                        // maps={this.state.maps}
                                        lat={28.4595}
                                        lng={77.0266}
                                        zoom={3}
                                    />
                                </div>
                            </div>
                            <div className="row text-center">
                            </div>
                        </div>
                    </section>
                </Row>
            </Container>
        )

    }

    // Did Mount.



    // loadData() {

    //     const { record, startDate } = this.props


    //     fetchStart();
    //     dataProvider(GET_MANY_REFERENCE, 'getProjectedAssetData', {
    //         pagination: { page: 1, perPage: 5 },
    //         sort: { field: 'title', order: 'ASC' },
    //         filter: { id: record.id, attribute: 'gps', startDate: this.state.startDate, endDate: this.state.endDate },
    //         target: 'telematicsSerialNumber',
    //         id: record.telematicsSerialNumber,
    //         sort: { field: 'created_at', order: 'DESC' }
    //     })

    //         .then((response) => {
    //             //console.log(response.data)

    //             let maps = response.data
    //             tableData = response.data
    //             this.setState({ maps })
    //             // console.log(this.state)
    //             // Update the main react-admin form (in this case, the comments creation form)
    //             // change(REDUX_FORM_NAME, 'post_id', data.id);
    //             // this.setState({ showDialog: false });
    //             showNotification('Maintenance Completed')

    //         })
    //         .catch(error => {
    //             showNotification(error.message, 'error');
    //         })
    //         .finally(() => {
    //             // Dispatch an action letting react-admin know a API call has ended

    //             fetchEnd();


    //         });


    // }

    // loadData = this.loadData.bind(this)


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
      //  const { photo_id, latitude, longitude } = this.props
         const { gps, telematicsSerialNumber } = this.props

        // Return Restaurant Marker Component.
        return (



            <Marker key={telematicsSerialNumber} position={{ lat: gps.location.lat, lng: gps.location.lon }} onClick={() => this.setState(state => ({ open: !state.open }))} onMouseOut={() => this.setState(state => ({ open: !state.open }))}>
                {this.state.open && (
                    <InfoWindow options={{ closeBoxURL: ``, enableEventPropagation: true }}>
                        <div style={{ backgroundColor: `white`, opacity: 1.00, padding: `20px` }}>
                            <div style={{ fontSize: `16px`, fontColor: `#08233B` }} >


                                <b> Telemetic Serial #: </b> {telematicsSerialNumber}
                                <br />
                                
                                <b> Date: </b> {(new Date(gps.timeStamp)).toDateString()}
                                <br />
                                <b> Speed:</b> {gps.speed} km/h
                                 <br />
                                
                                <b> Heading:</b> {gps.heading}0˚
                         </div>
                        </div>
                    </InfoWindow>
                )}
            </Marker>


        )

    }

}