import { Text } from "react-native";

import validateData from './validateData.js'
import sendReq from './sendReq.js'

export const handleSignin = async ({ formdata, setMessage }) => {
   setMessage(
      <Text
         style={{
            color: "green",
            marginHorizontal: "auto",
            marginVertical: 30
         }}>
         please wait...
      </Text>
   );
   if (!(await validateData(formdata, setMessage))) return;
   await sendReq({ formdata, route: "signin", setMessage });
};

export const handleSignup = async ({ formdata, setMessage }) => {
   setMessage(
      <Text
         style={{
            color: "green",
            marginHorizontal: "auto",
            marginVertical: 30
         }}>
         please wait...
      </Text>
   );
   if (!(await validateData(formdata, setMessage))) return;
   await sendReq({ formdata, route: "signup", setMessage });
};
