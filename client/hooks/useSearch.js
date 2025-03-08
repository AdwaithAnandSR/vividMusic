import { useEffect, useState } from "react";
import { useSocket } from "../context/socket.context.js";

const useSearch = ({ text, setList }) => {
   const { socket } = useSocket();
   const [songs, setSongs] = useState([]);
   useEffect(() => {
      const timeout = setTimeout(() => {
         if (!text || text.trim() == "") setSongs([]);
         else socket.emit("searchSongs", text);
      }, 500);
      socket.on("searchSongsRes", songs => {
         setSongs(songs);
      });
      return () => clearTimeout(timeout);
   }, [text]);

   return { songs, setSongs };
};

export default useSearch;
