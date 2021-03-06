import React from 'react'
import { GoogleMap, Marker } from '@react-google-maps/api';
import {useLoadScript} from "@react-google-maps/api";

const mapContainerStyle = {
  width: '95vw',
  height: '95vh',
}
const center = {
  lat: 40.4378698,
  lng: -3.8196207
}

const GoogleMaps: React.FC<{longitude: string, latitude: string}> = (props) => {
  const {isLoaded, loadError} = useLoadScript({
      googleMapsApiKey: process.env.REACT_APP_GOOGLE_KEY || 'AIzaSyD26iMBiLjZiKpOvV4NEsdqvvoRmC9n1mQ',
  });

  if (loadError) return <p>Error loading Maps</p>;
  if (!isLoaded) return <p>Loading Maps</p>;

  return(
      <GoogleMap 
      mapContainerStyle={mapContainerStyle} 
      zoom={4} 
      center={center} 
      >
        <Marker
          
          position={{
            lat: parseFloat(props.latitude),
            lng: parseFloat(props.longitude)
          }}
        />
      </GoogleMap>
  )
}

export default GoogleMaps;