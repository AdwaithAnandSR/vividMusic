"use client";
import { useState, useEffect } from "react";

import { Chart as Chartjs } from "chart.js/auto";
import { Bar, Line } from "react-chartjs-2";
import { motion } from "motion/react";

import fetchData from "../controllers/fetchMusicAddedDates.js";

const MusicAddedDateChart = () => {
   const [data, setData] = useState([]);
   const [filter, setFilter] = useState("all");

   useEffect(() => {
      const res = fetchData({ filter, setData });
   }, [filter]);

   return (
      <motion.div
         whileTap={{ opacity: 0.8, scale: 0.98 }}
         className="bg-zinc-950 mx-3 px-2 rounded-2xl h-[40vh] flex justify-center items-center mt-3"
      >
         <Line
            data={{
               labels: data.map(item => item._id),
               datasets: [
                  {
                     label: "Dimensions",
                     data: data.map(item => item.count),
                     backgroundColor: "#25f0ba",
                     borderColor: "#25f0ba",
                     borderWidth: 1
                  }
               ]
            }}
            options={{
               plugins: {
                  title: {
                     display: true,
                     text: "Music Uploaded Timesheet"
                  }
               },
               scales: {
                  x: {
                     grid: {
                        color: "#272727"
                     },
                     ticks: {
                        color: "white"
                     }
                  },
                  y: {
                     grid: {
                        color: "#272727"
                     },
                     ticks: {
                        color: "white"
                     }
                  }
               }
            }}
         />
      </motion.div>
   );
};

export default MusicAddedDateChart;
