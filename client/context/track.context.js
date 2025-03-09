import { useState, useEffect, useContext, createContext } from "react";
import { useAudioPlayer, useAudioPlayerStatus, AudioModule } from "expo-audio";
import MusicControl, { Command } from "react-native-music-control";

import { useLists } from "./list.context.js";
import { setToPlay } from "../controllers/music.controller.js";

import {
   setUpMusicController,
   playNextSong,
   playPrevSong,
   setPlaying
} from "../controllers/music.controller.js";

const TrackContext = createContext();

export const TrackProvider = ({ children }) => {
   const [track, setTrack] = useState(null);
   const { allSongs } = useLists();

   const player = useAudioPlayer(track?.url || "");
   const status = useAudioPlayerStatus(player);

   const setUpPlayer = async () => {
      await AudioModule.setAudioModeAsync({
         playsInSilentMode: true,
         shouldPlayInBackground: true,
         shouldRouteThroughEarpiece: true
      });
   };

   useEffect(() => {
      setUpPlayer();
      setUpMusicController();
   }, []);

   const playSong = () => {
      if (!track || !player) return;
      player.play();
      setToPlay(track, status);
   };

   useEffect(() => {
      playSong();
   }, [track]);

   useEffect(() => {
      if (status.playbackState === "ended") {
         playNextSong({ allSongs, setTrack, track });
      }

      if (track) {
         MusicControl.setNowPlaying({
            
            duration: status?.duration || 0, // Ensure duration is updated
            elapsedTime: status?.currentTime || 0
         });

         MusicControl.updatePlayback({
            elapsedTime: status?.currentTime || 0,
            duration: status?.duration || 0
         });
      }
   }, [status, track]);

   MusicControl.on(Command.pause, () => {
      MusicControl.setPlayback({
         state: MusicControl.STATE_PAUSED
      });
      player.pause();
   });
   MusicControl.on(Command.play, () => {
      MusicControl.setPlayback({
         state: MusicControl.STATE_PLAYING
      });
      player.play();
   });
   MusicControl.on(Command.nextTrack, () =>
      playNextSong({ allSongs, setTrack, track, status })
   );
   MusicControl.on(Command.previousTrack, () =>
      playPrevSong({ allSongs, setTrack, track, status })
   );

   return (
      <TrackContext.Provider
         value={{ track, setTrack, player, status, playSong }}
      >
         {children}
      </TrackContext.Provider>
   );
};

export const useTrack = () => useContext(TrackContext);
