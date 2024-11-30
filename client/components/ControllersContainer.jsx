import React from "react";
import { View, Text, StyleSheet , TouchableOpacity } from "react-native";
import { FontAwesome5, AntDesign } from "@expo/vector-icons";;

const ControllersContainer = ({ status, player }) => {
   return (
      <View style={styles.controllsContainer}>
         <TouchableOpacity style={styles.btnContainer}>
            <AntDesign name="stepbackward" size={28} color="white" />
         </TouchableOpacity>
         {status.playing ? (
            <TouchableOpacity
               onPress={() => player.pause()}
               style={styles.btnContainer}
            >
               <FontAwesome5 name="pause" size={28} color="white" />
            </TouchableOpacity>
         ) : (
            <TouchableOpacity
               onPress={() => player.play()}
               style={styles.btnContainer}
            >
               <FontAwesome5 name="play" size={28} color="white" />
            </TouchableOpacity>
         )}
         <TouchableOpacity style={styles.btnContainer}>
            <AntDesign name="stepforward" size={28} color="white" />
         </TouchableOpacity>
      </View>
   );
};

const styles = StyleSheet.create({
   controllsContainer: {
      width: "70%",
      height: "10%",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      alignSelf: "center"
   },
   btnContainer: {
      padding: "8%",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: "50%"
   }
});

export default ControllersContainer;
