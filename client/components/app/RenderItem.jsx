import React from "react";
import { TouchableOpacity, Text, StyleSheet, Dimensions } from "react-native";

import { theme } from "../../themes/themes.js";

const { width: vw, height: vh } = Dimensions.get("window");

const RenderItem = ({ item }) => {
   return (
      <TouchableOpacity style={styles.container}>
         <Text style={styles.songName}>RenderItem</Text>
      </TouchableOpacity>
   );
};

const styles = StyleSheet.create({
   container: {
      width: "100%",
      height: vh * 0.09,
      backgroundColor: theme.item,
      marginVertical: vh * 0.004,
      borderRadius: vw * 0.01,
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: vw * 0.03
   },
   songName: {
      color: theme.text,
      fontWeight: "bold",
      fontSize: vw * 0.04
   }
});

export default RenderItem;
