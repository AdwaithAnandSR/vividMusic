import { useEffect } from "react";
import { useSocket } from "../context/socket.context.js";

const useSearch = ({ text, setList }) => {
  const { socket } = useSocket();
  useEffect(() => {
    if (!text) return;
    socket.emit("searchSongs", text);
    console.log("socketc");
  }, [text]);
};

export default useSearch;
