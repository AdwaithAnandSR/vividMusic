import { View, Text } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

const Navbar = () => {
  return (
    <View style={{
      width: '100%',
      display: "flex",
      flexDirection: "column",
      alignItems: 'flex-end',
      justifyContent: "flex-end"
    }}>
      <Ionicons name="search" size={24} color="white" />
    </View>
  );
};

export default Navbar;
