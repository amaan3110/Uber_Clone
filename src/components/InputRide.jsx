import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AutoCompleteMap from "./AutoCompleteMap.jsx";
import {
  faCircle,
  faSquare,
  faLocationArrow,
} from "@fortawesome/free-solid-svg-icons";
import sourceContext from "../Context/SourceContext.js";
import opencage from "opencage-api-client";

const InputRide = ({ type }) => {
  const { source, setSource } = useContext(sourceContext);
  const [address, setAddress] = useState("");

  const handleInputChange = (e) => {
    setAddress(e.target.value);
  };

  useEffect(() => {
    if (address.length > 0) {
      getSourceCoordinates(address);
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

  async function getSourceCoordinates(address) {
    const apiKey = "d772a005c6174d5d8a3a3f2af5cf9d45";
    try {
      const res = await opencage.geocode({ q: address, key: apiKey });
      const lat = res.results[0].geometry.lat;
      const lng = res.results[0].geometry.lng;
      setSource([lat, lng]);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="flex items-center gap-2 bg-slate-300 px-3 py-0 rounded-lg mt-3">
      {type == "source" ? (
        <FontAwesomeIcon icon={faCircle} />
      ) : (
        <FontAwesomeIcon icon={faSquare} />
      )}

      {type === "source" ? (
        <input
          type="text"
          className="w-full p-1 outline-none bg-transparent rounded my-2"
          placeholder={
            type == "source" ? "Pickup Location" : "DropOff Location"
          }
          onChange={handleInputChange}
        />
      ) : (
        <AutoCompleteMap />
      )}

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
