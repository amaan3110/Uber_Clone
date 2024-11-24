import React, { useState } from "react";
import Uber_Moto from "../assets/Uber_Moto.png";
import Uber_Auto from "../assets/Uber_Auto.png";
import Uber_Go from "../assets/Uber_Go.png";
import Uber_Premier from "../assets/Uber_Premier.png";
import Uber_Sedan from "../assets/Uber_Sedan.png";
import Uber_Shuttle from "../assets/Uber_Shuttle.png";
import Uber_XL from "../assets/Uber_XL.png";
import UberComfort_Green from "../assets/UberComfort_Green.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTag } from "@fortawesome/free-solid-svg-icons";

function RideAvailable() {
  const rideAvailable = [
    {
      img: Uber_Moto,
      name: "Moto",
      price: 22.49,
      discount: "50% off",
      actualPrice: 45.13,
    },
    {
      img: Uber_Auto,
      name: "Uber Auto",
      price: 76.07,
      discount: "50% off",
      actualPrice: 106.75,
    },
    {
      img: Uber_Go,
      name: "Uber Go",
      price: 99.04,
      discount: "25% off",
      actualPrice: 132.06,
    },
    {
      img: Uber_Sedan,
      name: "Go Sedan",
      price: 115.25,
      discount: "25% off",
      actualPrice: 153.93,
    },
    {
      img: Uber_Premier,
      name: "Premier",
      price: 122.72,
      discount: "25% off",
      actualPrice: 163.63,
    },
    {
      img: UberComfort_Green,
      name: "Uber Green",
      price: 153.22,
      discount: "25% off",
      actualPrice: 204.29,
    },
    {
      img: Uber_XL,
      name: "UberXL",
      price: 189.07,
      discount: "25% off",
      actualPrice: 252.1,
    },
    {
      img: Uber_Shuttle,
      name: "Uber Shuttle",
      price: 151.43,
      discount: "25% off",
      actualPrice: 201.64,
    },
  ];
  return (
    <div className="w-full">
      {rideAvailable.map((ride, index) => (
        <div
          key={index}
          className="w-full flex items-center justify-between border-[3px] border-black rounded-lg my-2 p-2 cursor-pointer"
        >
          <div className="flex items-center gap-4">
            <img src={ride.img} alt={ride.name} className="w-[130px] h-auto" />
            <p className="text-2xl font-bold">{ride.name}</p>
          </div>
          <div className="text-right">
            <p className="text-[14px] text-green-500">
              <FontAwesomeIcon icon={faTag} />
              {ride.discount}
            </p>
            <p className="text-2xl font-semibold">₹{ride.price.toFixed(2)}</p>
            <p className="text-[16px] text-slate-400 line-through">
              ₹{ride.actualPrice}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default RideAvailable;
