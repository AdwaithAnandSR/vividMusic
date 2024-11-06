import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Image } from "expo-image";
import Slider from "@react-native-community/slider";

import { theme } from "../../../themes/themes.js";
import { useAudio } from "../../../context/audioContext.js";

const { width: vw, height: vh } = Dimensions.get("window");
const blurhash =
   "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

const TrackControllerFullView = () => {
   const {
      currentTrackForUiUpdating,
      isPlaying,
      loadAndPlayTrack,
      pause,
      isBuffering,
      play,
      progress,
      duration
   } = useAudio();

   const [trackControllerValue, setTrackControllerValue] = React.useState(0.5);

function msToMinSec(milliseconds) {
    let minutes = Math.floor(milliseconds / 60000);
    let seconds = ((milliseconds % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

   return (
      <View style={styles.container}>
         <Text numberOfLines={1} style={styles.title}>
            {currentTrackForUiUpdating.title}
         </Text>

         <View style={styles.imageContainer}>
            <Image
               style={{ width: "100%", height: "100%" }}
               source={currentTrackForUiUpdating.cover}
               placeholder={{ blurhash }}
               contentFit='cover'
               transition={1000}
            />
         </View>

         <View style={styles.sliderContainer}>
            <Text style={styles.time}>{msToMinSec(progress / duration)}</Text>
            <Slider
               style={{ width: vw * 0.8, height: 60 }}
               value={progress}
               minimumValue={0}
               maximumValue={1}
               minimumTrackTintColor='#FFFFFF'
               maximumTrackTintColor='#676060'
            />
            <Text style={styles.time}>{msToMinSec(duration)}</Text>
         </View>
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: theme.fullViewMusicControllerColor
   },
   title: {
      color: theme.text,
      fontSize: vw * 0.05,
      width: "80%",
      marginHorizontal: "auto",
      fontWeight: "bold",
      marginVertical: vh * 0.045
   },
   imageContainer: {
      width: vw * 0.8,
      height: vw * 0.8,
      marginHorizontal: "auto",
      borderRadius: vw * 0.5,
      marginTop: vh * 0.04,
      overflow: "hidden"
   },
   sliderContainer: {
      height: vh * 0.05,
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
      paddingLeft: vw * 0.05,
      paddingRight: vw * 0.05,
      marginTop: vh * 0.1
   },
   time: {
      color: "white"
   }
});

export default TrackControllerFullView;
