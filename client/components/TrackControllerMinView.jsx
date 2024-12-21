import React, { useRef, useEffect, useState, useMemo } from "react";
import {
   View,
   Text,
   StyleSheet,
   TouchableOpacity,
   Dimensions,
   Animated
} from "react-native";
import { Image } from "expo-image";
import LottieView from "lottie-react-native";

import { useTrack } from "../context/track.context.js";
import { useLists } from "../context/list.context.js";

const { height: vh, width: vw } = Dimensions.get("window");

const TrackControllerMinView = ({ handleToFullView }) => {
   const { track, setTrack, status } = useTrack();
   const { allSongs } = useLists();
   const [swipeStartPos, setSwipeStartPos] = useState({});

   const arr = [0, 0.2, 0.4, 0.6, 0.8, 1];
   const randomElem = arr[Math.floor(Math.random() * arr.length)];
   const colorAnimation = useRef(new Animated.Value(randomElem)).current;

   const backgroundColor = colorAnimation.interpolate({
      inputRange: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
      outputRange: [
         "#23adc9",
         "#59fcd1",
         "#c75ef4",
         "#f52041",
         "#cafd63",
         "#f72c93",
         "#cafd63",
         "#f52041",
         "#c75ef4",
         "#59fcd1",
         "#23adc9"
      ]
   });

   useEffect(() => {
      const loopAnimation = Animated.loop(
         Animated.sequence([
            Animated.timing(colorAnimation, {
               toValue: 1,
               duration: 80000,
               useNativeDriver: false
            })
         ])
      );
      loopAnimation.start();

      // Cleanup to stop animation on component unmount
      return () => loopAnimation.stop();
   }, [colorAnimation]);

   const handleSwipeStart = e => {
      setSwipeStartPos({ x: e.nativeEvent.pageX, y: e.nativeEvent.pageY });
   };

   const handleSwipeEnd = e => {
      const endX = e.nativeEvent.pageX;
      const endY = e.nativeEvent.pageY;

      const diffY = endY - swipeStartPos.y;
      if (diffY > 70) {
         setTrack();
         return;
      }

      const diffX = endX - swipeStartPos.x;
      if (diffX > 100) {
         const currentIndex = allSongs.findIndex(
            item => item._id === track?._id
         );
         if (currentIndex === allSongs.length - 1) setTrack(allSongs[0]);
         else setTrack(allSongs[currentIndex + 1]);
      } else if (diffX < -100) {
         const currentIndex = allSongs.findIndex(
            item => item._id === track?._id
         );
         if (currentIndex === 0) setTrack(allSongs[allSongs.length - 1]);
         else setTrack(allSongs[currentIndex - 1]);
      } else if (diffX === 0 && diffY === 0) handleToFullView();
   };

   if (!track) return;

   return (
      <TouchableOpacity
         activeOpacity={0.9}
         onPressIn={handleSwipeStart}
         onPressOut={handleSwipeEnd}
         style={styles.container}
      >
         <Animated.View style={[styles.gradient, { backgroundColor }]} />
         <View
            style={{
               width: vh * 0.06,
               height: vh * 0.06,
               borderRadius: vh * 0.5,
               overflow: "hidden",
               marginLeft: vw * 0.03,
               justifyContent: "center"
            }}
         >
            <Image
               source={track?.cover}
               style={{ width: "100%", height: "100%" }}
               contentFit="cover"
               transition={1000}
            />
            {status.playing || status.isBuffering ? (
               <LottieView
                  source={require("../assets/animations/musicPlayingAnim2.json")}
                  autoPlay
                  loop
                  style={{
                     width: 35,
                     height: 35,
                     opacity: 0.8,
                     marginLeft: -10,
                     position: "absolute",
                     alignSelf: "center",
                     color: "#cc4cf9"
                  }}
               />
            ) : null}
         </View>
         <Text
            numberOfLines={2}
            style={{
               width: "75%",
               fontWeight: "bold",
               fontSize: vw * 0.04
            }}
         >
            {track?.title}
         </Text>
      </TouchableOpacity>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      maxHeight: 100,
      alignItems: "center",
      flexDirection: "row",
      gap: vw * 0.03,
      marginBottom: 5,
      overflow: "hidden",
      borderRadius: vw
   },
   gradient: {
      width: "100%",
      height: "100%",
      position: "absolute"
   }
});

export default TrackControllerMinView;
