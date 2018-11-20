import React, { PureComponent } from 'react';
import { Card, CardBody, Col } from 'reactstrap';
import { compose, withProps, withStateHandlers } from 'recompose'
import { GoogleMap, Marker, withGoogleMap, withScriptjs } from 'react-google-maps';
import { InfoBox } from 'react-google-maps/lib/components/addons/InfoBox';
import CloseIcon from 'mdi-react/CloseIcon';
import data from './smallData.json';


const MapWithAMarker = compose(
  withProps({
    //generate your API key
    googleMapURL: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyD84CRFR44xSC242F5rPodUZ3CqKbUlqMw&v=3.exp&libraries=geometry,drawing,places',
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div className='map' style={{ height: `360px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  // withStateHandlers(() => ({
  //   isOpen: false,
  // })
  // // , {
  // //     onToggleOpen: ({ isOpen }) => () => ({
  // //       isOpen: !isOpen,
  // //     })
  // //   }
  
  // ),
  withScriptjs,
  withGoogleMap
)((props) =>
  <GoogleMap
    defaultZoom={3}
    defaultCenter={{ lat: 56.009483, lng: 92.8121694 }}
  >
  
    {/* {props.isMarkerShown && */}
    {props.markers.map(marker => (
      
      <Marker key={marker.photo_id} position={{ lat: marker.latitude, lng: marker.longitude }} onClick={props.onToggleOpen}>
        {props.isOpen &&
          <InfoBox options={{ closeBoxURL: ``, enableEventPropagation: true }}>
            <div style={{ backgroundColor: `white`, opacity: 0.75, padding: `12px` }}>
              <div style={{ fontSize: `16px`, fontColor: `#08233B` }} >
              <div onClick={props.onToggleOpen}><CloseIcon/></div>
            
                {marker.photo_id}
                </div>
            </div>
          </InfoBox>
        }
      </Marker>
    ))}
    {/* } */}
      
  </GoogleMap>
);

class BasicMap extends PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      mapMarkers: [],
      open: false
    }
  }
  
  componentWillReceiveProps(){
    let mapMarkersData =data.photos;
  this.setState({mapMarkers: mapMarkersData})
 // this.state.mapMarkers = data.photos;
 // console.log(this.state.mapMarkers)
  }
componentDidMount(){
 
 
  let mapMarkersData =data.photos;
  this.setState({mapMarkers: mapMarkersData})
  this.state.mapMarkers = data.photos;
 // console.log(this.state.mapMarkers)
}
  render() {
   const {mapMarkers} = this.props
    console.log(this.state)
    return (
      <Col xs={12} md={12} lg={12}>
        <Card>
          <CardBody>
            <div className='card__title'>
              <h5 className='bold-text'>{"Location"}</h5>
            </div>
            <MapWithAMarker  isMarkerShown={true} markers={data.photos} />
          </CardBody>
        </Card>
      </Col>
    )
  }
}

export default (BasicMap);
