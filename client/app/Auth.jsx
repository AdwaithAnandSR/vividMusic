import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";

import Signin from "../components/auth/Signin.jsx";
import Signup from "../components/auth/Signup.jsx";

const Auth = () => {
   const [isNewuser, setIsNewuser] = useState(false);
   const [formdata, setFormdata] = useState({username: "", password: ""});

   return (
      <>
         {isNewuser ? (
            <Signup
               setFormdata={setFormdata}
               formdata={formdata}
               setIsNewuser={setIsNewuser}
            />
         ) : (
            <Signin
               setFormdata={setFormdata}
               formdata={formdata}
               setIsNewuser={setIsNewuser}
            />
         )}
      </>
   );
};

export default React.memo(Auth);
