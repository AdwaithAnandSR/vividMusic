import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Slider from "@react-native-community/slider";

const { height: vh, width: vw } = Dimensions.get("window");

const SliderContainer = ({ status }) => {
   const formateTime = ms => {
      const minutes = Math.floor(ms / 60000);
      const seconds = Math.floor((ms % 60000) / 1000);
      const formattedMinutes = String(minutes).padStart(2, "0");
      const formattedSeconds = String(seconds).padStart(2, "0");
      return `${formattedMinutes}:${formattedSeconds}`;
   };
   
   return (
      <View style={styles.sliderContainer}>
         <Text style={{ color: "white" }}>
            {formateTime(status.currentTime)}
         </Text>
         <Slider
            style={{ width: "75%", height: 40 }}
            minimumValue={0}
            maximumValue={200}
            value={status.currentTime / status.duration}
            onSlidingComplete={e => console.log(e)}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#656565"
         />
         <Text style={{ color: "white" }}>{formateTime(status.duration)}</Text>
      </View>
   );
};

const styles = StyleSheet.create({
   sliderContainer: {
      width: "100%",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      marginVertical: vh * 0.04
   }
});

export default SliderContainer;
