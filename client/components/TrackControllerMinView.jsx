import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const TrackControllerMinView = ({ handleToFullView }) => {
   return (
      <TouchableOpacity onPress={handleToFullView} style={styles.container}>
         <Text>TrackControllerMinView</Text>
      </TouchableOpacity>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center"
   }
});

export default TrackControllerMinView;
