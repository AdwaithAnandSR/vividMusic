import React, { useRef, useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Animated } from "react-native";

import TrackControllerFullView from "./TrackControllerFullView.jsx";
import TrackControllerMinView from "./TrackControllerMinView.jsx";

import { useTrack } from "../context/track.context.js";

const TrackController = () => {
   const heightAnim = useRef(new Animated.Value(0.09)).current;
   const [isMinView, setIsMinView] = useState(true);
   const { track } = useTrack();

   if (!track) return null;

   const handleToFullView = () => {
      Animated.timing(heightAnim, {
         toValue: 1,
         duration: 100,
         useNativeDriver: false
      }).start();
      setIsMinView(false);
   };

   const handleToMinView = () => {
      Animated.timing(heightAnim, {
         toValue: 0.09,
         duration: 50,
         useNativeDriver: false
      }).start();
      setIsMinView(true);
   };

   const AnimatedTouchableOpacity =
      Animated.createAnimatedComponent(TouchableOpacity);

   return (
      <Animated.View
         style={[
            {
               position: "absolute",
               width: "100%",
               bottom: 0,
               zIndex: 999
            },
            {
               height: heightAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: ["0%", "100%"]
               })
            }
         ]}
      >
         {isMinView ? (
            <TrackControllerMinView handleToFullView={handleToFullView} />
         ) : (
            <TrackControllerFullView handleToMinView={handleToMinView} />
         )}
      </Animated.View>
   );
};

const styles = StyleSheet.create({
   text: {
      color: "white",
      textAlign: "center",
      marginTop: 10
   }
});

export default TrackController;
