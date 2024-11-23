import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";

function MapUI({ sourceLocation }) {
  const position =
    sourceLocation[0] && sourceLocation[1]
      ? [sourceLocation[1], sourceLocation[0]]
      : [28.586729, 77.371452];
  const zoomLevel = 13;

  const locationIcon = new Icon({
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    iconSize: [20, 31],
    iconAnchor: [12, 41],
    popupAnchor: [0, -41],
  });
  return (
    <div className="w-full h-[85vh]">
      <MapContainer
        center={position}
        zoom={zoomLevel}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <Marker position={position} icon={locationIcon}>
          <Popup>Custom Marker</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default MapUI;
