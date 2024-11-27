import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AutoCompleteMap from "./AutoCompleteMap.jsx";
import { faLocationArrow } from "@fortawesome/free-solid-svg-icons";
import sourceContext from "../Context/SourceContext.js";
import opencage from "opencage-api-client";

const InputRide = ({ type }) => {
  const { source, setSource } = useContext(sourceContext);
  const [address, setAddress] = useState("");
  const apiKey = "d772a005c6174d5d8a3a3f2af5cf9d45";

  const handleInputChange = (e) => {
    setAddress(e.target.value);
  };

  useEffect(() => {
    if (address.length > 0) {
      getSourceCoordinates(address);
    }
  }, [address]);

  const getCurrentLocation = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setSource([latitude, longitude]);
          getAddress(latitude, longitude)
            .then((adr) => {
              console.log(adr);

              setAddress(adr);
            })
            .catch((error) => {
              console.error("Error fetching address:", error);
              setAddress("Unable to fetch address");
            });
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
    try {
      const res = await opencage.geocode({ q: address, key: apiKey });
      const lat = res.results[0].geometry.lat;
      const lng = res.results[0].geometry.lng;
      setSource([lat, lng]);
    } catch (error) {
      console.error(error);
    }
  }

  function getAddress(lat, lng) {
    return opencage
      .geocode({
        q: `${lat},${lng}`,
        key: apiKey,
      })
      .then((response) => {
        return response.results[0]?.formatted || "Unknown location";
      })
      .catch((error) => {
        console.error("Error fetching address:", error);
        return "Unknown location";
      });
  }

  return (
    <div className="flex items-center gap-2 bg-slate-300 px-3 py-0 rounded-lg mt-3">
      {type == "source" ? (
        <svg
          width="35"
          height="35"
          viewBox="0 0 24 24"
          fill="none"
          data-baseweb="icon"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm5-2a5 5 0 1 1-10 0 5 5 0 0 1 10 0Z"
            fill="currentColor"
          ></path>
        </svg>
      ) : (
        <svg
          width="30"
          height="30"
          viewBox="0 0 24 24"
          fill="none"
          data-baseweb="icon"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M14 10h-4v4h4v-4ZM7 7v10h10V7H7Z"
            fill="currentColor"
          ></path>
        </svg>
      )}

      {type === "source" ? (
        <input
          type="text"
          value={address}
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
