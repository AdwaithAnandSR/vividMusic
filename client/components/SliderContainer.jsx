import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Slider from "@react-native-community/slider";

const { height: vh } = Dimensions.get("window");

const SliderContainer = ({ status, player, lightVibrant }) => {
   const formatTime = ms => {
      if (!ms || ms < 0) return "00:00";
      const minutes = Math.floor(ms / 60);
      const seconds = Math.floor(ms - minutes * 60);

      return (
         (minutes < 10 ? `0${minutes}` : minutes) +
         ":" +
         (seconds < 10 ? `0${seconds}` : seconds)
      );
   };

   return (
      <View style={styles.sliderContainer}>
         <Text style={styles.timeText}>{formatTime(status.currentTime)}</Text>
         <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={1}
            value={status.currentTime / status.duration}
            onSlidingComplete={async value => {
               try {
                  await player.seekTo(value * status.duration);
               } catch (error) {
                  console.error("Error seeking:", error);
               }
            }}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#a6a5a5"
            thumbTintColor={lightVibrant}
         />
         <Text style={styles.timeText}>
            {formatTime(status?.duration)}
         </Text>
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
   },
   slider: {
      width: "70%",
      height: 40
   },
   timeText: {
      color: "white"
   }
});

export default SliderContainer;
