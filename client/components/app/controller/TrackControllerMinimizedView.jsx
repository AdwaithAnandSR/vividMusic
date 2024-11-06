import React from "react";
import {
   View,
   Text,
   StyleSheet,
   Dimensions,
   TouchableOpacity
} from "react-native";
import { AntDesign, FontAwesome6, EvilIcons } from "@expo/vector-icons";
import { Image } from "expo-image";

import { theme } from "../../../themes/themes.js";
import { useAudio } from "../../../context/audioContext.js";
import { useSongList } from "../../../context/globalSongList.js";
const { width: vw, height: vh } = Dimensions.get("window");

const blurhash =
   "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";
const TrackControllerMinimizedView = ({ setIsMinimized }) => {
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
      if (globalSongList[index + 1])
         loadAndPlayTrack(globalSongList[index + 1]);
      else loadAndPlayTrack(globalSongList[0]);
   };

   if (!currentTrackForUiUpdating) return null;
   return (
      <TouchableOpacity
         onPress={() => setIsMinimized(false)}
         activeOpacity={0.95}
         style={styles.container}>
         <View style={styles.imageContainer}>
            <Image
               style={{ width: "100%", height: "100%" }}
               source={currentTrackForUiUpdating.cover}
               placeholder={{ blurhash }}
               contentFit='cover'
               transition={1000}
            />
         </View>
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
      </TouchableOpacity>
   );
};

const styles = StyleSheet.create({
   container: {
      width: "100%",
      height: Dimensions.get("window").height * 0.085,
      display: "flex",
      flexDirection: "row",
      gap: vw * 0.02,
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: theme.minimizedTrackColor,
      paddingHorizontal: 20,
      borderRadius: vw * 0.02
   },
   imageContainer: {
      width: vh * 0.045,
      height: vh * 0.045,
      borderRadius: Dimensions.get("window").width / 2,
      overflow: "hidden"
   },
   text: {
      color: theme.text,
      width: "65%",
      fontWeight: "bold",
      fontSize: Dimensions.get("window").width * 0.04
   },
   btnContainer: {
      display: "flex",
      width: "25%",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-around"
   }
});

export default TrackControllerMinimizedView;
