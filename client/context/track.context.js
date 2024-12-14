import { useState, useEffect, useContext, createContext } from "react";
import { useAudioPlayer, useAudioPlayerStatus, AudioModule } from "expo-audio";

import { useLists } from "./list.context.js";

const TrackContext = createContext();

export const TrackProvider = ({ children }) => {
   const [track, setTrack] = useState(null);
   const { allSongs } = useLists();

   const player = useAudioPlayer(track?.url || "");
   const status = useAudioPlayerStatus(player);

   useEffect(() => {
      const setUpPlayer = async () => {
         await AudioModule.setAudioModeAsync({
            interruptionMode: "doNotMix",
            playsInSilentMode: true,
            shouldPlayInBackground: true,
            shouldRouteThroughEarpiece: true
         });
      };

      setUpPlayer();
   }, []);

   useEffect(() => {
      if (status.playbackState === "ended") {
         const currentIndex = allSongs.findIndex(
            song => song._id === track?._id
         );
         const nextTrack =
            currentIndex === allSongs.length - 1
               ? allSongs[0]
               : allSongs[currentIndex + 1];
         setTrack(nextTrack);
      }
   }, [status.playbackState]);

   useEffect(() => {
      if (track && track.url && player) {
         player.play();

         const setUp = async () => {
            await player.setAudioModeAsync({
               playsInSilentMode: true,
               shouldPlayInBackground: true,
               shouldRouteThroughEarpiece: true
            });
         };
         setUp();
      }
   }, [track, player]);

   return (
      <TrackContext.Provider value={{ track, setTrack, player, status }}>
         {children}
      </TrackContext.Provider>
   );
};

export const useTrack = () => useContext(TrackContext);
