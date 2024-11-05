import React, { createContext, useState, useContext } from "react";

const GlobalControllerContext = createContext();

export const GlobalControllerProvider = ({ children }) => {
   const [track, setTrack] = useState();
   const [isPlaying, setIsPlaying] = useState(false);

   return (
      <GlobalControllerContext.Provider
         value={{
            track,
            setTrack,
            isPlaying,
            setIsPlaying,

         }}>
         {children}
      </GlobalControllerContext.Provider>
   );
};
export const useGlobalValues = () => {
   return useContext(GlobalControllerContext);
};
