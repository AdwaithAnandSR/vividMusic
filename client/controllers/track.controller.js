import MusicControl, { Command } from "react-native-music-control";
import { AudioModule } from "expo-audio";

export const setUpMusicController = () => {
   MusicControl.enableBackgroundMode(true);
   MusicControl.enableControl("pause", true);
   MusicControl.enableControl("play", true);
   MusicControl.enableControl("nextTrack", true);
   MusicControl.enableControl("previousTrack", true);
   MusicControl.enableControl("changePlaybackPosition", true);
   MusicControl.setNotificationId(10, "channel");
};

export const setUpPlayer = async () => {
   await AudioModule.setAudioModeAsync({
      interruptionMode: "doNotMix",
      playsInSilentMode: true,
      shouldPlayInBackground: true,
      shouldRouteThroughEarpiece: true
   });
};
