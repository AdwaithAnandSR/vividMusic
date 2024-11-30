import { useState, useEffect, useContext, createContext } from "react";

const TrackContext = createContext();

export const TrackProvider = ({ children }) => {
   const [track, setTrack] = useState();

   return (
      <TrackContext.Provider value={{ track, setTrack }}>
         {children}
      </TrackContext.Provider>
   );
};

export const useTrack = () => useContext(TrackContext);
