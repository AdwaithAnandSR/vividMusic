import MusicControl, { Command } from "react-native-music-control";

export const setUpMusicController = () => {
   MusicControl.enableBackgroundMode(true);
   MusicControl.enableControl("pause", true);
   MusicControl.enableControl("play", true);
   MusicControl.enableControl("nextTrack", true);
   MusicControl.enableControl("previousTrack", true);
   MusicControl.enableControl("changePlaybackPosition", true);
   MusicControl.setNotificationId(10, "channel");
};

export const setPlaying = (track, status) => {
   if (!track || !status) return;

   MusicControl.setNowPlaying({
      state: MusicControl.STATE_PLAYING,
      title: track?.title,
      artwork: track?.cover
         ? track.cover
         : require("../assets/images/images.jpeg"),
      duration: status?.duration,
      elapsedTime: 100,
      
      colorized: true,
   });

   MusicControl.setPlayback({
      state: MusicControl.STATE_PLAYING
   });
};

export const playNextSong = ({ allSongs, setTrack, track }) => {
   const currentIndex = allSongs.findIndex(song => song._id === track?._id);
   const nextTrack =
      currentIndex === allSongs.length - 1
         ? allSongs[0]
         : allSongs[currentIndex + 1];
   setTrack(nextTrack);
   
   MusicControl.updatePlayback({
      title: nextTrack?.title,
      artwork: track?.cover
         ? track.cover
         : require("../assets/images/images.jpeg"),
      duration: nextTrack?.duration / 60,
      elapsedTime: 0,
      
   });
};

export const playPrevSong = ({ allSongs, setTrack, track }) => {
   const currentIndex = allSongs.findIndex(item => item._id === track?._id);
   
   const nextTrack =
      currentIndex === 0
         ? allSongs[allSongs.length - 1]
         : allSongs[currentIndex - 1]
   setTrack(nextTrack);
   
   MusicControl.updatePlayback({
      title: nextTrack?.title,
      artwork: track?.cover
         ? track.cover
         : require("../assets/images/images.jpeg"),
      duration: nextTrack?.duration / 60,
      elapsedTime: 0,
      
   });
};
