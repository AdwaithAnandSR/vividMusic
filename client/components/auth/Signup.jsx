import React from "react";
import {
   View,
   Text,
   TouchableOpacity,
   StyleSheet,
   Dimensions,
   TextInput,
   ScrollView
} from "react-native";
import Checkbox from "expo-checkbox";

import { theme } from "../../themes/themes.js";
import {
   handleSignup
} from "../../controller/auth/auth.controller.js";


const { width: vw, height: vh } = Dimensions.get("window");

const Signup = ({ setFormdata, formdata, setIsNewuser }) => {
   const [showPass, setShowPass] = React.useState(false);
   const [message, setMessage] = React.useState("");
   return (
      <ScrollView style={styles.container}>
         <TouchableOpacity onPress={() => setIsNewuser(false)}>
            <Text style={[styles.header, styles.text]}>Signup</Text>
         </TouchableOpacity>
         <View style={styles.form}>
            <TextInput
               placeholder='username...'
               placeholderTextColor='#746a6a'
               style={styles.input}
               value={formdata.username}
               onChangeText={txt =>
                  setFormdata(prev => ({ ...prev, username: txt }))
               }
            />

            <TextInput
               placeholder='password...'
               placeholderTextColor='#746a6a'
               style={styles.input}
               secureTextEntry={!showPass}
               value={formdata.password}
               onChangeText={txt =>
                  setFormdata(prev => ({ ...prev, password: txt }))
               }
            />

            <View
               style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 10,
                  marginLeft: "auto",
                  paddingRight: 15
               }}>
               <Text style={styles.text}>Show password</Text>
               <Checkbox
                  style={styles.checkbox}
                  value={showPass}
                  onValueChange={setShowPass}
               />
            </View>
            {message}

            <TouchableOpacity onPress={()=> handleSignup({formdata, setMessage})} style={styles.btn}>
               <Text style={{ fontSize: vw * 0.07, fontWeight: "bold" }}>
                  Signup
               </Text>
            </TouchableOpacity>
         </View>

         <TouchableOpacity
            onPress={() => setIsNewuser(false)}
            style={{
               display: "flex",
               justifyContent: "center",
               alignItems: "center",
               marginTop: 20
            }}>
            <Text
               style={{
                  fontSize: vw * 0.05,
                  color: theme.text,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center"
               }}>
               Already have an account?{" "}
               <Text
                  style={{
                     fontSize: vw * 0.05,
                     fontWeight: "bold",
                     color: theme.text
                  }}>
                  Signin
               </Text>
            </Text>
         </TouchableOpacity>
      </ScrollView>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: theme.background
   },
   text: {
      color: theme.text
   },
   header: {
      fontSize: vw * 0.15,
      fontWeight: "bold",
      letterSpacing: -2,
      padding: vw * 0.05
   },
   form: {
      width: "90%",
      height: vh * 0.6,
      marginHorizontal: "auto",
      marginTop: vh * 0.1
   },
   input: {
      width: "100%",
      height: vh * 0.08,
      borderColor: theme.text,
      borderWidth: 1,
      borderRadius: vw * 0.5,
      color: theme.text,
      paddingLeft: vw * 0.05,
      fontSize: vh * 0.022,
      marginVertical: vh * 0.02
   },
   btn: {
      width: "100%",
      height: vh * 0.07,
      borderRadius: vw * 0.5,
      marginHorizontal: "auto",
      backgroundColor: "#df4da6",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginVertical: vh * 0.02,
      position: "absolute",
      bottom: 0
   }
});

export default React.memo(Signup);
