// AudioContext.js
import React, { createContext, useState, useEffect, useContext } from "react";
import { Audio } from "expo-av";

export const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
   const [sound, setSound] = useState();
   const [isPlaying, setIsPlaying] = useState(false);
   const [isBuffering, setIsBuffering] = useState(false);
   const [currentTrackForUiUpdating, setCurrentTrackForUiUpdating] = useState();
   const [currentTrack, setCurrentTrack] = useState();

   const loadAndPlayTrack = async track => {
      if (currentTrack === track) return;
      setCurrentTrackForUiUpdating(track)
      if (sound) {
         await sound.stopAsync();
         await sound.unloadAsync();
         setIsPlaying(false)
      }

      const { sound: newSound } = await Audio.Sound.createAsync(
         { uri: track.url },
         { shouldPlay: true }
      );
      setSound(newSound);
      setIsPlaying(true);
      setCurrentTrack(track);
      setCurrentTrackForUiUpdating(track)
      newSound.setOnPlaybackStatusUpdate(status => {
         if(status.isBuffering) setIsBuffering(true)
         else setIsBuffering(false)
         if (status.didJustFinish) setIsPlaying(false);
      });
   };

   const pause = async () => {
      if (sound) {
         await sound.pauseAsync();
         setIsPlaying(false);
      }
   };

   const play = async () => {
      if (sound) {
         await sound.playAsync();
         setIsPlaying(true);
      }
   };

   const stop = async () => {
      if (sound) {
         await sound.stopAsync();
         setIsPlaying(false);
      }
   };

   useEffect(() => {
      return sound ? () => sound.unloadAsync() : undefined;
   }, [sound]);

   return (
      <AudioContext.Provider
         value={{
            isPlaying,
            isBuffering,
            currentTrack,
            loadAndPlayTrack,
            pause,
            play,
            stop,
            currentTrackForUiUpdating
         }}>
         {children}
      </AudioContext.Provider>
   );
};

export const useAudio = () => {
   return useContext(AudioContext);
};
