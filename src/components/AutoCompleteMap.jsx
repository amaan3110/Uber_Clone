import React, { useContext, useState } from "react";
import Select from "react-select";
import destinationContext from "../Context/DestinationContext.js";

const customStyles = {
  control: (provided) => ({
    ...provided,
    width: "100%",
    backgroundColor: "transparent",
    border: "none",
    boxShadow: "none",
    padding: 0,
    margin: 0,
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "gray",
    fontSize: "14px",
  }),
};

const AutoCompleteMap = () => {
  const [options, setOptions] = useState([]);
  const { destination, setDestination } = useContext(destinationContext);

  const getDestinationCoordinates = async (inputValue) => {
    const apiKey = "d772a005c6174d5d8a3a3f2af5cf9d45";
    if (!inputValue || inputValue.trim().length === 0) return;

    const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
      inputValue
    )}&key=${apiKey}`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data.results?.length) {
        setOptions(
          data.results.map((result) => ({
            value: result.geometry,
            label: result.formatted,
          }))
        );
        setDestination([
          data.results[0].geometry.lat,
          data.results[0].geometry.lng,
        ]);
      }
    } catch (error) {
      console.error("Error fetching destination:", error);
    }
  };

  const handleInputChange = (inputValue) => {
    getDestinationCoordinates(inputValue);
  };

  return (
    <div className="w-full p-1">
      <Select
        onInputChange={handleInputChange}
        options={options}
        placeholder="DropOff Location"
        styles={customStyles}
        isClearable
      />
    </div>
  );
};

export default AutoCompleteMap;
