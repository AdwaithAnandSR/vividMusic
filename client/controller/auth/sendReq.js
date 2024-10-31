import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import axios from "axios";
import Constants from "expo-constants";
import { Toast } from "toastify-react-native";
import { Text } from 'react-native';

const api = Constants.expoConfig.extra.api.client;

const sendReq = async ({ formdata, route, setMessage }) => {
   const { username, password } = formdata;
   try {
      const res = await axios.post(`${api}/${route}`, { username, password });
      if (res.status === 200) {
         await AsyncStorage.setItem("username", res.data.user.username);
         await AsyncStorage.setItem("userId", res.data.user._id);
         await AsyncStorage.setItem("role", res.data.user.role);
         setMessage(
            <Text
               style={{
                  color: "green",
                  marginHorizontal: "auto",
                  marginVertical: 30
               }}>
               authentication successful
            </Text>
         );
         Toast.success("authentication successful 🥳");
         router.replace("/");
      }
   } catch (error) {
      if (error?.response?.data)
         setMessage(
            <Text
               style={{
                  color: "red",
                  marginHorizontal: "auto",
                  marginVertical: 30
               }}>
               {error.response.data.message}
            </Text>
         );
      else
         setMessage(
            <Text
               style={{
                  color: "red",
                  marginHorizontal: "auto",
                  marginVertical: 30
               }}>
               authentication failed ! {error.message}
            </Text>
         );
      console.log(error);
   }
};

export default sendReq