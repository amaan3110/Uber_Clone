import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTag } from "@fortawesome/free-solid-svg-icons";
import Popup from "./Popup";

function RideAvailable({ rides }) {
  const [selectedRide, setSelectedRide] = useState(0);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleClick = (rideIndex) => {
    setSelectedRide(rideIndex);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div className="relative w-full h-auto">
      {rides.map((ride, index) => (
        <div
          key={index}
          className={`w-full flex items-center flex-col lg:flex-row max-sm:flex-row justify-between ${
            selectedRide === index ? "border-[3px] border-black" : ""
          } rounded-lg my-2 px-2 py-1 cursor-pointer`}
          onClick={() => handleClick(index)}
        >
          <div className="flex items-center">
            <img src={ride.img} alt={ride.name} className="w-[130px] h-auto" />
            <div>
              <p className="text-2xl font-bold">{ride.name}</p>
              <p className="text-[#4b4b4b] font-thin">{ride.tag}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[14px] text-green-500 flex items-center justify-end gap-1">
              <FontAwesomeIcon icon={faTag} />
              {ride.discount}
            </p>
            <p className="text-2xl font-semibold">₹{ride.price}</p>
            <p className="text-[16px] text-[#5e5e5e] line-through">
              ₹{ride.actualPrice}
            </p>
          </div>
        </div>
      ))}

      {isPopupOpen && (
        <Popup
          rides={rides}
          selectedRide={selectedRide}
          closePopup={closePopup}
        />
      )}
    </div>
  );
}

export default RideAvailable;
