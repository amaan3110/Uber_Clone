import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircle,
  faSquare,
  faLocationArrow,
} from "@fortawesome/free-solid-svg-icons";
import sourceContext from "../Context/SourceContext.js";
import destinationContext from "../Context/DestinationContext.js";
import opencage from "opencage-api-client";

const InputRide = ({ type }) => {
  const { source, setSource } = useContext(sourceContext);
  const { destination, setDestination } = useContext(destinationContext);

  const [address, setAddress] = useState("");

  const handleInputChange = (e) => {
    setAddress(e.target.value);
  };

  useEffect(() => {
    if (address.length > 0) {
      getCoordinates(address);
    }
  }, [address]);

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const locationArray = [latitude, longitude];
          setSource(locationArray);
        },
        (error) => {
          console.error("Error getting location", error);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const apiKey = "d772a005c6174d5d8a3a3f2af5cf9d45";

  async function getCoordinates(address) {
    try {
      const res = await opencage.geocode({ q: address, key: apiKey });
      const lat = res.results[0].geometry.lat;
      const lng = res.results[0].geometry.lng;
      setDestination([lat, lng]);
    } catch (error) {
      console.error(error);
    }
  }

  // getCoordinates("Sector 52, Noida, UP");

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
