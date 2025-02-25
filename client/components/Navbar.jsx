<<<<<<< HEAD
import { View, Text, Dimensions, TouchableOpacity, ImageComponent } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";

const { height: vh, width: vw } = Dimensions.get("window");
=======
import { View, Text } from "react-native";
import React from "react";
>>>>>>> 199009bc643648195bfbd5e76044980ea5f5bcfe

const Navbar = () => {
  return (
    <View
<<<<<<< HEAD
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        justifyContent: "center",
        height: vh * 0.07,
        paddingHorizontal: vw * 0.08,
      }}
    >
      <TouchableOpacity onPress={()=> router.push('others/Search')}>
        <Ionicons name="search" size={24} color="white" />
      </TouchableOpacity>
=======
      
    >
      <Text>Navbar</Text>
>>>>>>> 199009bc643648195bfbd5e76044980ea5f5bcfe
    </View>
  );
};

export default Navbar;
