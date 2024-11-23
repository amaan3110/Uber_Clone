import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircle,
  faSquare,
  faLocationArrow,
} from "@fortawesome/free-solid-svg-icons";
import sourceContext from "../Context/SourceContext.js";
import destinationContext from "../Context/DestinationContext.js";

const InputRide = ({ type }) => {
  const { source, setSource } = useContext(sourceContext);
  const { destination, setDestination } = useContext(destinationContext);

  const [address, setAddress] = useState("");

  const handleInputChange = (e) => {
    setAddress(e.target.value);
  };

  useEffect(() => {
    if (address.length > 0) {
      convertAddressToCoordinates();
    }
  }, [address]);

  const convertAddressToCoordinates = async () => {
    const apiUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
      address
    )}&format=json&limit=1`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data.length > 0) {
        const { lat, lon } = data[0];
        const locationArray = [parseFloat(lat), parseFloat(lon)];
        if (type === "source") {
          setSource(locationArray);
        } else {
          setDestination(locationArray);
        }
      } else {
        console.error("No results found for the address.");
      }
    } catch (error) {
      console.error("Error converting address:", error);
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const locationArray = [longitude, latitude];
          if (type === "source") {
            setSource(locationArray);
          } else {
            setDestination(locationArray);
          }
        },
        (error) => {
          console.error("Error getting location", error);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  return (
    <div className="flex items-center gap-2 bg-slate-300 px-3 py-0 rounded-lg mt-3">
      {type == "source" ? (
        <FontAwesomeIcon icon={faCircle} />
      ) : (
        <FontAwesomeIcon icon={faSquare} />
      )}

      <input
        type="text"
        className="w-full p-1 outline-none bg-transparent rounded my-2"
        placeholder={type == "source" ? "Pickup Location" : "DropOff Location"}
        onChange={handleInputChange}
      />

      {type === "source" && (
        <button
          type="button"
          onClick={getCurrentLocation}
          className="flex items-center justify-center w-[36px] h-[30px] rounded-full bg-blue-500 text-white"
        >
          <FontAwesomeIcon icon={faLocationArrow} />
        </button>
      )}
    </div>
  );
};

export default InputRide;
