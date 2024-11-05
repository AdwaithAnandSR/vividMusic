import React, { createContext, useState, useContext } from "react";

const SongListContext = createContext();

export const SongListProvider = ({ children }) => {
   const [globalSongList, setGlobalSongList] = useState([]);
   const [track, setTrack] = useState();
   const [page, setPage] = useState(1);
   return (
      <SongListContext.Provider
         value={{
            globalSongList,
            setGlobalSongList,
            page,
            setPage,
            track,
            setTrack
         }}>
         {children}
      </SongListContext.Provider>
   );
};
export const useSongList = () => {
   return useContext(SongListContext);
};
