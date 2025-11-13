import React from "react";
import { Map, Marker } from "pigeon-maps";

const MapComponent = () => {
  return (
    <div style={{ width: "100%", height: "500px" }}>
      <Map
        defaultCenter={[12.9352, 77.6245]} // Bangalore
        defaultZoom={5}
        height={500}
      >
        {/* Hardcoded markers */}
        <Marker width={50} anchor={[12.9352, 77.6245]} color="red" />    {/* Bangalore */}
        <Marker width={50} anchor={[19.076, 72.8777]} color="blue" />    {/* Mumbai */}
        <Marker width={50} anchor={[28.6139, 77.209]} color="green" />   {/* Delhi */}
      </Map>
    </div>
  );
};

export default MapComponent;
