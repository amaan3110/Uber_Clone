import React, { useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import { Icon } from "leaflet";

function MapUI({ sourceLocation, destinationLocation }) {
  const defaultSource = [28.586729, 77.371452];
  const defaultDestination = [28.576191, 77.345787];
  const sourcePosition =
    sourceLocation[0] && sourceLocation[1]
      ? [sourceLocation[1], sourceLocation[0]]
      : defaultSource;

  const destinationPosition =
    destinationLocation[0] && destinationLocation[1]
      ? [destinationLocation[1], destinationLocation[0]]
      : defaultDestination;

  const zoomLevel = 13;

  const locationIcon = new Icon({
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    iconSize: [20, 31],
    iconAnchor: [12, 41],
    popupAnchor: [0, -41],
  });

  const pathPositions = [sourcePosition, destinationPosition];
  return (
    <div className="w-full h-[85vh]">
      <MapContainer
        center={sourcePosition}
        zoom={zoomLevel}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <Marker position={sourcePosition} icon={locationIcon}>
          <Popup>Source Location</Popup>
        </Marker>

        <Marker position={destinationPosition} icon={locationIcon}>
          <Popup>Destination Location</Popup>
        </Marker>

        <Polyline positions={pathPositions} color="blue" />
      </MapContainer>
    </div>
  );
}

export default MapUI;
