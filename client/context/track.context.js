import { useState, useEffect, useContext, createContext } from "react";
import { useAudioPlayer, useAudioPlayerStatus } from "expo-audio";

const TrackContext = createContext();

export const TrackProvider = ({ children }) => {
   const [track, setTrack] = useState(null);

   const player = useAudioPlayer(track?.url || "");
   const status = useAudioPlayerStatus(player);

   useEffect(() => {
      if (track && track.url && player) {
         player.play();
         
         const setUp = async () => {
            const res = await player.setAudioModeAsync({
               playsInSilentMode: true,
               shouldPlayInBackground: true,
               shouldRouteThroughEarpiece: true
            });
         };
         setUp()
      }
   }, [track, player]);

   return (
      <TrackContext.Provider value={{ track, setTrack, player, status }}>
         {children}
      </TrackContext.Provider>
   );
};

export const useTrack = () => useContext(TrackContext);
