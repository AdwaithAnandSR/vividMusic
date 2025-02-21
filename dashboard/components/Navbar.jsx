"use client";

import { Menu } from "lucide-react";
import { motion } from "motion/react";

const Navbar = () => {
   return (
      <div className="flex w-full justify-between items-center px-5 py-4">
         <h1 className="font-black text-3xl">Dashboard</h1>
         <div className="flex ">
            <motion.div whileTap={{ opacity: 0.5, scale: 0.7 }}>
               <Menu size={25} />
            </motion.div>
         </div>
      </div>
   );
};

export default Navbar;
