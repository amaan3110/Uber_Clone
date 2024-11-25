import React, { useState } from "react";
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
  const [ride, setRide] = useState(false);

  const price = calculateDistance(
    source[0],
    source[1],
    destination[0],
    destination[1]
  );

  const showLocation = () => {
    console.log("Source:", source);
    console.log("Destination:", destination);
    setRide(true);
    console.log(price);
  };

  function calculateDistance(lat1, lon1, lat2, lon2) {
    const toRadians = (degree) => (degree * Math.PI) / 180;

    const R = 6371;
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
    const radLat1 = toRadians(lat1);
    const radLat2 = toRadians(lat2);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(radLat1) *
        Math.cos(radLat2) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c;
    return distance;
  }

  const rideAvailable = [
    {
      img: Uber_Moto,
      name: "Moto",
      price: 22.49,
      discount: "50% off",
      actualPrice: 45.13,
      tag: "Affordable, motorcycle rides",
    },
    {
      img: Uber_Auto,
      name: "Uber Auto",
      price: 76.07,
      discount: "50% off",
      actualPrice: 106.75,
      tag: "",
    },
    {
      img: Uber_Go,
      name: "Uber Go",
      price: 99.04,
      discount: "25% off",
      actualPrice: 132.06,
      tag: "Affordable compact rides",
    },
    {
      img: Uber_Sedan,
      name: "Go Sedan",
      price: 115.25,
      discount: "25% off",
      actualPrice: 153.93,
      tag: "Affordable sedans",
    },
    {
      img: Uber_Premier,
      name: "Premier",
      price: 122.72,
      discount: "25% off",
      actualPrice: 163.63,
      tag: "Comfortable sedans, top-quality drivers",
    },
    {
      img: UberComfort_Green,
      name: "Uber Green",
      price: 153.22,
      discount: "25% off",
      actualPrice: 204.29,
      tag: "Go green",
    },
    {
      img: Uber_XL,
      name: "UberXL",
      price: 189.07,
      discount: "25% off",
      actualPrice: 252.1,
      tag: "Comfortable SUVs",
    },
    {
      img: Uber_Shuttle,
      name: "Uber Shuttle",
      price: 151.43,
      discount: "25% off",
      actualPrice: 201.64,
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
