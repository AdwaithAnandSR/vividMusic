import React, { useEffect, useState } from "react";
import Constants from "expo-constants";
import axios from "axios";

const api = Constants.expoConfig.extra.api.dev;
const useGetGlobalSongs = ({ limit, page, setList, setHasMore }) => {
   useEffect(() => {
      if (!page || !limit || !setList || !setHasMore) return;
      const fetchSongs = async () => {
         try {
            const res = await axios.post(`${api}/getGlobalSongs`, {
               page,
               limit
            });
            if (res?.data && res?.data?.musics?.length > 0) {
               setList(prev => [...prev, ...res.data.musics]);
               if (res?.data?.musics?.length < limit) setHasMore(false);
            } else setHasMore(false);
         } catch (error) {
            console.log(error);
         }
      };
      fetchSongs();
   }, [page]);
};

export default useGetGlobalSongs;
