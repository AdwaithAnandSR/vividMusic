import React, { useEffect, useState } from "react";
import axios from "axios";
import Constants from "expo-constants";

const api = Constants.expoConfig.extra.clientApi || "http://localhost:4000";

const useGetAllSongs = ({ page, limit, setAllSongs }) => {
   console.log(api);
   useEffect(() => {
      if (!page || !limit || !setAllSongs) return;

      const fetchSongs = async () => {
         console.log("fetching...");
         const res = await axios.post(`${'https://vivid-music.vercel.app'}/getGlobalSongs`, { limit, page });
         setAllSongs(prev => [...prev, ...res.data.musics]);
         console.log(res);
      };
      fetchSongs();
   }, [page]);
};

export default useGetAllSongs;
