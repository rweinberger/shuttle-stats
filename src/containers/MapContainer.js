import React, { Component } from "react"
import { connect } from 'react-redux'
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react'

const mapStyles = {
  width: '100%',
  height: '100%'
};

class MapContainer extends Component {
  render() {
    return (
      <Map
        google={this.props.google}
        zoom={15}
        style={mapStyles}
        initialCenter={{
         lat: 42.35,
         lng: -71.09
        }}>
        <Marker
        title={'The marker`s title will appear as a tooltip.'}
        name={'Shuttle ' + this.props.vehicleId }
        position={{ lat: this.props.lat, lng: this.props.long }} />
      </Map>
    );
  }
}

const wrappedContainer = GoogleApiWrapper({
  apiKey: 'AIzaSyDorMEZrngWHMt2oGj0AbWpX3Gwjr2H4kI'
})(MapContainer);


const mapStateToProps = state => {
  return { 
    vehicleId: state.vehicles.vehicleId,
    lat: state.vehicles.lat,
    long: state.vehicles.long
  }
}

export default connect(
  mapStateToProps
)(wrappedContainer)