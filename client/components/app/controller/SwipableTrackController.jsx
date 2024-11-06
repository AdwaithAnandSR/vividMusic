import React, { useState } from "react";
import { View, Text, Animated, Dimensions, StyleSheet } from "react-native";
import {
   PanGestureHandler,
   GestureHandlerRootView,
   State
} from "react-native-gesture-handler";

import TrackControllerMinimizedView from "./TrackControllerMinimizedView.jsx";
import TrackControllerFullView from "./TrackControllerFullView.jsx";

import { useAudio } from "../../../context/audioContext.js";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const SwipableTrackController = () => {
   const [isMinimized, setIsMinimized] = useState(true);
   const translateX = new Animated.Value(0);

   const { currentTrackForUiUpdating, stop } = useAudio();

   const minimizedHeight = 80;
   const fullHeight = screenHeight;

   const handleGesture = isMinimized ? Animated.event(
      [{ nativeEvent: { translationX: translateX } }],
      { useNativeDriver: true }
   ) : null

   const handleGestureEnd = event => {
      if (!isMinimized) return;
      const { translationX } = event.nativeEvent;
      if (translationX > screenWidth / 2) {
         Animated.timing(translateX, {
            toValue: screenWidth,
            duration: 300,
            useNativeDriver: true
         }).start();
         stop();
      } else {
         Animated.timing(translateX, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true
         }).start();
      }
   };

   if (!currentTrackForUiUpdating && isMinimized) return;

   return (
      <GestureHandlerRootView
         style={[
            styles.container,
            {
               height:isMinimized ? minimizedHeight : '100%',
            }
         ]}>
         <PanGestureHandler
            onGestureEvent={handleGesture}
            onHandlerStateChange={event =>
               event.nativeEvent.state === State.END && handleGestureEnd(event)
            }>
            <Animated.View
               style={{
                  transform: [{ translateX }],
                  height: isMinimized ? minimizedHeight : fullHeight
               }}>
               {
                  isMinimized ? 
               <TrackControllerMinimizedView setIsMinimized={setIsMinimized} />
               : <TrackControllerFullView /> }
            </Animated.View>
         </PanGestureHandler>
      </GestureHandlerRootView>
   );
};

const styles = StyleSheet.create({
   container: {
      width: "100%",
      backgroundColor: "transparent",
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 99,
      overflow: "hidden"
   },
   songTitle: {
      color: "white",
      fontSize: 18,
      padding: 15,
      textAlign: "center"
   },
   fullScreenContent: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center"
   },
   fullScreenText: {
      color: "white",
      fontSize: 24
   }
});

export default SwipableTrackController;
