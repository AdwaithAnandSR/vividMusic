"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";

import Navbar from "../components/Navbar.jsx";
import MusicAddedDateChart from "../components/MusicAddedDateChart.jsx";

export default function Home() {
   const router = useRouter();

   return (
      <div>
         <Navbar />
         <div
            onClick={() => router.push("manageSongs")}
            className="h-[20vh] w-full flex justify-center py-5"
         >
            <motion.div whileTap={{ opacity: 0.5, scale: 0.7 }}>
               <Button className="border border-white bg-transparent w-[80vw] py-8 font-black rounded-2xl text-xl">
                  Manage Playlist
               </Button>
            </motion.div>
         </div>
      </div>
   );
}
