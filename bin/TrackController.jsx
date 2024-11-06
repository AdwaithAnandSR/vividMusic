import React from "react";
import {
   View,
   Text,
   StyleSheet,
   Dimensions,
   TouchableOpacity
} from "react-native";
import { AntDesign, FontAwesome6, EvilIcons } from "@expo/vector-icons";

import { theme } from "../../themes/themes.js";
import { useAudio } from "../../context/audioContext.js";
import { useSongList } from "../../context/globalSongList.js";

const TrackController = () => {
   const {
      currentTrackForUiUpdating,
      isPlaying,
      loadAndPlayTrack,
      pause,
      isBuffering,
      play
   } = useAudio();
   const { globalSongList } = useSongList();

   const handlePlayNextSong = () => {
      index = globalSongList.findIndex(
         item => item._id === currentTrackForUiUpdating._id
      );
      if (globalSongList[index + 1]) loadAndPlayTrack(globalSongList[index + 1]);
      else loadAndPlayTrack(globalSongList[0]);
   };

   if (!currentTrackForUiUpdating) return null;
   return (
      <View style={styles.container}>
         <Text numberOfLines={1} style={styles.text}>
            {currentTrackForUiUpdating?.title}
         </Text>
         <View style={styles.btnContainer}>
            <TouchableOpacity
               style={{
                  padding: 10,
                  borderRadius: 100
               }}
               onPress={() => {
                  isBuffering ? null : isPlaying ? pause() : play();
               }}>
               <FontAwesome6
                  name={isPlaying ? "pause" : "play"}
                  size={24}
                  color={theme.text}
               />
            </TouchableOpacity>

            <TouchableOpacity
               onPress={handlePlayNextSong}
               style={{
                  padding: 10,
                  borderRadius: 100
               }}>
               <AntDesign name='stepforward' size={24} color={theme.text} />
            </TouchableOpacity>
         </View>
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      width: "100%",
      height: Dimensions.get("window").height * 0.08,
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: theme.background,
      borderTopWidth: 0.5,
      borderColor: theme.text,
      paddingHorizontal: 20
   },
   text: {
      color: theme.text,
      width: "80%",
      fontWeight: "bold",
      fontSize: Dimensions.get("window").width * 0.05
   },
   btnContainer: {
      display: "flex",
      width: "25%",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-around"
   }
});

export default TrackController;
