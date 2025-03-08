import { useState, useEffect, useContext, createContext } from "react";
import { useAudioPlayer, useAudioPlayerStatus, AudioModule } from "expo-audio";
import MusicControl, { Command } from "react-native-music-control";

import { useLists } from "./list.context.js";
import {
   setUpMusicController,
   setPlaying,
   playNextSong,
   playPrevSong
} from "../controllers/music.controller.js";

const TrackContext = createContext();

export const TrackProvider = ({ children }) => {
   const [track, setTrack] = useState(null);
   const { allSongs } = useLists();

   const player = useAudioPlayer(track?.url || "");
   const status = useAudioPlayerStatus(player);

   const setUpPlayer = async () => {
      await AudioModule.setAudioModeAsync({
         interruptionMode: "doNotMix",
         playsInSilentMode: true,
         shouldPlayInBackground: true,
         shouldRouteThroughEarpiece: true
      });
   };

   useEffect(() => {
      setUpPlayer();
      setUpMusicController();
   }, []);

   useEffect(() => {
      if (status.playbackState === "ended")
         playNextSong({ allSongs, setTrack, track });

      MusicControl.updatePlayback({
         elapsedTime: status.currentTime
      });
   }, [status]);

   useEffect(() => {
      if (track && track.url && player) {
         player.play();
         setPlaying(track, status); //background play controll

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
      playNextSong({ allSongs, setTrack, track })
   );
   MusicControl.on(Command.previousTrack, () =>
      playPrevSong({ allSongs, setTrack, track })
   );

   return (
      <TrackContext.Provider value={{ track, setTrack, player, status }}>
         {children}
      </TrackContext.Provider>
   );
};

export const useTrack = () => useContext(TrackContext);
