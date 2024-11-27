import React, { useState } from "react";
import { getDistance } from "geolib";
import SearchUI from "./SearchUI";
import MapUI from "./MapUI";
import sourceContext from "../Context/SourceContext";
import destinationContext from "../Context/DestinationContext";
import RideAvailable from "./RideAvailable";
import Uber_Moto from "../assets/Uber_Moto.png";
import Uber_Auto from "../assets/Uber_Auto.png";
import Uber_Go from "../assets/Uber_Go.png";
import Uber_Premier from "../assets/Uber_Premier.png";
import Uber_Sedan from "../assets/Uber_Sedan.png";
import Uber_Shuttle from "../assets/Uber_Shuttle.png";
import Uber_XL from "../assets/Uber_XL.png";
import UberComfort_Green from "../assets/UberComfort_Green.png";

const MainScreen = () => {
  const [source, setSource] = useState([null, null]);
  const [destination, setDestination] = useState([null, null]);
  const [price, setPrice] = useState("");
  const [ride, setRide] = useState(false);

  const showLocation = () => {
    console.log("Source:", source);
    console.log("Destination:", destination);
    setRide(true);
    const km = calculateDistance(
      source[0],
      source[1],
      destination[0],
      destination[1]
    );
    console.log(km);
    setPrice(km);
  };

  function calculateDistance(lat1, lon1, lat2, lon2) {
    const coord1 = { latitude: lat1, longitude: lon1 };
    const coord2 = { latitude: lat2, longitude: lon2 };

    const distance = getDistance(coord1, coord2);
    return distance / 1000;
  }

  const rideAvailable = [
    {
      img: Uber_Moto,
      name: "Moto",
      price: ((price * 7 * 50) / 100).toFixed(2),
      discount: "50% off",
      actualPrice: (price * 7).toFixed(2),
      tag: "Affordable, motorcycle rides",
    },
    {
      img: Uber_Auto,
      name: "Uber Auto",
      price: ((price * 11 * 50) / 100).toFixed(2),
      discount: "50% off",
      actualPrice: (price * 11).toFixed(2),
      tag: "",
    },
    {
      img: Uber_Go,
      name: "Uber Go",
      price: (price * 13 - (price * 13 * 25) / 100).toFixed(2),
      discount: "25% off",
      actualPrice: (price * 13).toFixed(2),
      tag: "Affordable compact rides",
    },
    {
      img: Uber_Sedan,
      name: "Go Sedan",
      price: (price * 19 - (price * 19 * 25) / 100).toFixed(2),
      discount: "25% off",
      actualPrice: (price * 19).toFixed(2),
      tag: "Affordable sedans",
    },
    {
      img: Uber_Premier,
      name: "Premier",
      price: (price * 25 - (price * 25 * 25) / 100).toFixed(2),
      discount: "25% off",
      actualPrice: (price * 25).toFixed(2),
      tag: "Comfortable sedans, top-quality drivers",
    },
    {
      img: UberComfort_Green,
      name: "Uber Green",
      price: (price * 22 - (price * 22 * 25) / 100).toFixed(2),
      discount: "25% off",
      actualPrice: (price * 22).toFixed(2),
      tag: "Go green",
    },
    {
      img: Uber_XL,
      name: "UberXL",
      price: (price * 29 - (price * 29 * 25) / 100).toFixed(2),
      discount: "25% off",
      actualPrice: (price * 29).toFixed(2),
      tag: "Comfortable SUVs",
    },
    {
      img: Uber_Shuttle,
      name: "Uber Shuttle",
      price: (price * 20 - (price * 20 * 25) / 100).toFixed(2),
      discount: "25% off",
      actualPrice: (price * 20).toFixed(2),
      tag: "Shared rides, lowest cost",
    },
  ];
  return (
    <sourceContext.Provider value={{ source, setSource }}>
      <destinationContext.Provider value={{ destination, setDestination }}>
        <div className="grid grid-cols-1 md:grid-cols-3">
          <div className="w-full p-4">
            <SearchUI showLocation={showLocation} />
            {ride && <RideAvailable rides={rideAvailable} />}
          </div>
          <div className="w-full col-span-2 p-4">
            <MapUI sourceLocation={source} destinationLocation={destination} />
          </div>
        </div>
      </destinationContext.Provider>
    </sourceContext.Provider>
  );
};

export default MainScreen;
