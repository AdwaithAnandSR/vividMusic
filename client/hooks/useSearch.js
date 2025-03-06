import { useEffect, useState } from "react";
import { useSocket } from "../context/socket.context.js";

const useSearch = ({ text, setList }) => {
   const { socket } = useSocket();
   const [songs, setSongs] = useState([])
   useEffect(() => {
      if (!text) return;
      socket.emit("searchSongs", text);
      socket.on("searchSongsRes", (songs) => {
        setSongs(songs);
      });
   }, [text]);

   return { songs , setSongs}
};

export default useSearch;
