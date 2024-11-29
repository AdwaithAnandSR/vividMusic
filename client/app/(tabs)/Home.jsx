import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { useTheme } from "../../context/theme.context.js"

const Home = () => {
   
   const { styles } = useTheme()
   
   return (
      <View style={{ backgroundColor: styles.backgroundColor, height: '100%',}}>
         <Text>Home</Text>
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center"
   }
});

export default Home;
