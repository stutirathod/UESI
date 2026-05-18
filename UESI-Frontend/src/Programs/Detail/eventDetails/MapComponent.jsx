import React, { useState } from "react";
import { Map, Marker, NavigationControl, Popup } from "react-map-gl";
// import "mapbox-gl/dist/mapbox-gl.css";
import "./mapbox-gl.css"


const MapComponent = ({ geometry, title }) => {

  if (!geometry?.coordinates) return <p>Location data not available</p>;

  const [longitude, latitude] = geometry.coordinates;

  return (
    <div className="map-container" style={{ width: "100%", height: "400px" }}>
      <Map
        mapboxAccessToken={MAPBOX_TOKEN}
        initialViewState={{ longitude, latitude, zoom: 10 }}
        style={{ width: "100%", height: "100%" }}
        mapStyle="mapbox://styles/mapbox/streets-v12"
      >
        <NavigationControl position="top-right" />

        {/* Custom Marker with Image */}
        <Marker longitude={longitude} latitude={latitude} color="red" onClick={() => setShowPopup(true)}/>
      </Map>
    </div>
  );
};

export default MapComponent;