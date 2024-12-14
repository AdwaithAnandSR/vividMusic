import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Slider from "@react-native-community/slider";

const { height: vh, width: vw } = Dimensions.get("window");

const SliderContainer = ({ status, player , lightVibrant}) => {
   const formateTime = ms => {
      if(!ms) return `00:00`;
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
            style={{ width: "70%", height: 40 }}
            minimumValue={0}
            maximumValue={1}
            value={status.currentTime / status.duration}
            onSlidingComplete={async value => {
               try {
                  await player.seekTo((value * status.duration) );
               } catch (error) {
                  throw new Error(error)
               }
            }}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#a6a5a5"
            thumbTintColor={lightVibrant}
         />
         <Text style={{ color: "white" }}>{formateTime(status.duration).length > 10 ? '00:00' : formateTime(status.duration)}</Text>
      </View>
   );
};

const styles = StyleSheet.create({
   sliderContainer: {
      width: "100%",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      marginVertical: vh * 0.05
   }
});

export default SliderContainer;
