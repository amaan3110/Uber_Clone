import React, { useState } from "react";
import Select from "react-select";

const AutoCompleteMap = () => {
  const [options, setOptions] = useState([]);
  const API_KEY = "d772a005c6174d5d8a3a3f2af5cf9d45";

  const fetchSuggestions = async (inputValue) => {
    const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
      inputValue
    )}&key=${API_KEY}&limit=5`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data.results) {
        const suggestions = data.results.map((result) => ({
          value: [result.geometry.lat, result.geometry.lng],
          label: result.formatted,
        }));
        setOptions(suggestions);
      }
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  const handleInputChange = (inputValue) => {
    if (inputValue && inputValue.trim().length > 0) {
      fetchSuggestions(inputValue);
    }
  };

  const handleSelect = (selectedOption) => {
    if (selectedOption) {
      console.log("Selected coordinates:", selectedOption.value);
      console.log("Selected address:", selectedOption.label);
    }
  };

  return (
    <div>
      <Select
        onInputChange={handleInputChange}
        options={options}
        onChange={handleSelect}
        placeholder="Search for a location..."
      />
    </div>
  );
};

export default AutoCompleteMap;
