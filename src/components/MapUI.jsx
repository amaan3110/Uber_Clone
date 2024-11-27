import React from "react";
import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import { Icon } from "leaflet";
import sourceMarker from "../assets/sourceMarker.png";
import destinationMarker from "../assets/destinationMarker.png";

function MapUI({ sourceLocation, destinationLocation }) {
  const defaultSource = [28.586729, 77.371452];
  const defaultDestination = [28.576191, 77.345787];
  const sourcePosition =
    sourceLocation[0] && sourceLocation[1]
      ? [sourceLocation[0], sourceLocation[1]]
      : defaultSource;

  const destinationPosition =
    destinationLocation[0] && destinationLocation[1]
      ? [destinationLocation[0], destinationLocation[1]]
      : defaultDestination;

  const zoomLevel = 13;

  const sourceIcon = new Icon({
    iconUrl: sourceMarker,
    iconSize: [30, 30],
  });
  const destinationIcon = new Icon({
    iconUrl: destinationMarker,
    iconSize: [30, 30],
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

        <Marker position={sourcePosition} icon={sourceIcon} />
        <Marker position={destinationPosition} icon={destinationIcon} />

        <Polyline positions={pathPositions} color="black" />
      </MapContainer>
    </div>
  );
}

export default MapUI;
