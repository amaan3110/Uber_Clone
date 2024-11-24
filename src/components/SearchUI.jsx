import React from "react";
import InputRide from "./InputRide";

const SearchUI = ({ showLocation }) => {
  return (
    <div className="w-full p-3 rounded-md border-2">
      <h1 className="text-[18px]">Get a Ride</h1>
      <InputRide type="source" />
      <InputRide type="destination" />
      <button
        className="w-full p-2 rounded-lg text-white bg-black mt-4"
        onClick={showLocation}
      >
        See Prices
      </button>
    </div>
  );
};

export default SearchUI;
