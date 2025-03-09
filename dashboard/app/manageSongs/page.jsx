"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";

import Navbar from "../../components/Navbar.jsx";

export default function ManageSongs() {
   const [data, setData] = useState([]);

   useEffect(() => {
      const fetchSongs = async () => {
         try {
            const url = "http://localhost:5000";
            const res = await axios.post(`${url}/getGlobalSongs`, {
               limit: 50,
               page: 1
            });
            setData(prev => [...prev, ...res.data.musics]);
         } catch (error) {
            alert(error.message);
         }
      };
      fetchSongs();
   }, []);

   return (
      <div>
         <Navbar />
         <div className="min-h-screen w-full bg-amber-500">
            {data.map(item => {
               {
                  alert(item.title)
               }
            })}
         </div>
      </div>
   );
   
}
