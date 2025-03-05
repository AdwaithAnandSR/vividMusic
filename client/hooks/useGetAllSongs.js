import React, { useEffect, useState } from "react";
import axios from "axios";
import Constants from "expo-constants";

// const api = Constants.expoConfig.extra.clientApi ;
const api = "http://192.168.20.104:4000"

const useGetAllSongs = ({ page, limit, setAllSongs }) => {
   const [loading, setLoading] = useState(true);
   const [hasMore, setHasMore] = useState(true);


   useEffect(() => {
      if (!page || !limit || !setAllSongs) return;

      const fetchSongs = async () => {
         setLoading(true);

         const res = await axios.post(`${api}/getGlobalSongs`, {
           limit,
           page,
         });
           
         if (res.data.musics.length < limit) setHasMore(false);
         setAllSongs(prev => [...prev, ...res.data.musics]);
         setLoading(false);
      };
      fetchSongs();
   }, [page]);
   return { loading, hasMore };
};

export default useGetAllSongs;
