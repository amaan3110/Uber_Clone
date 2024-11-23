import React, { useState } from "react";
import SearchUI from "./SearchUI";
import MapUI from "./MapUI";
import sourceContext from "../Context/SourceContext";
import destinationContext from "../Context/DestinationContext";

const MainScreen = () => {
  const [source, setSource] = useState([null, null]);
  const [destination, setDestination] = useState([null, null]);

  const showLocation = () => {
    console.log("Source:", source);
    console.log("Destination:", destination);
  };
  return (
    <sourceContext.Provider value={{ source, setSource }}>
      <destinationContext.Provider value={{ destination, setDestination }}>
        <div className=" grid grid-cols-1 md:grid-cols-3 ">
          <div className="w-full p-4">
            <SearchUI showLocation={showLocation} />
          </div>
          <div className="w-full col-span-2 p-4">
            <MapUI sourceLocation={source} />
          </div>
        </div>
      </destinationContext.Provider>
    </sourceContext.Provider>
  );
};

export default MainScreen;
