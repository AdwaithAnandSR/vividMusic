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
      speed: 1,
      colorized: true,
      title: track?.title,
      artwork: track?.cover
         ? track.cover
         : require("../assets/images/images.jpeg"),
      duration: status?.duration,
      elapsedTime: 0
   });
   MusicControl.setPlayback({
      state: MusicControl.STATE_PLAYING
   });
   MusicControl.updatePlayback({
      elapsedTime: status.currentTime,
      speed: 1
   });
};

export const setToPlay = (track, status) => {
   MusicControl.setNowPlaying({
      state: MusicControl.STATE_PLAYING,
      speed: 1,
      colorized: true,
      title: track?.title,
      artwork: track?.cover ? track.cover : require("../assets/images/images.jpeg"),
      duration: status?.duration || 0,
      elapsedTime: 0 // Reset elapsed time
   });

   MusicControl.setPlayback({
      state: MusicControl.STATE_PLAYING,
      duration: status?.duration || 0
   });
};

export const playNextSong = ({ allSongs, setTrack, track }) => {
   const currentIndex = allSongs.findIndex(song => song._id === track?._id);
   const nextTrack =
      currentIndex === allSongs.length - 1
         ? allSongs[0]
         : allSongs[currentIndex + 1];

   setTrack(nextTrack); // Update the state first

   setTimeout(() => {
      MusicControl.setNowPlaying({
         state: MusicControl.STATE_PLAYING,
         colorized: true,
         title: nextTrack?.title,
         artwork: nextTrack?.cover
            ? nextTrack.cover
            : require("../assets/images/images.jpeg"),
         duration: 0, // Reset the duration initially
         elapsedTime: 0
      });
   }, 500); // Delay to ensure track state updates first
};

export const playPrevSong = ({ allSongs, setTrack, track }) => {
   const currentIndex = allSongs.findIndex(item => item._id === track?._id);

   const nextTrack =
      currentIndex === 0
         ? allSongs[allSongs.length - 1]
         : allSongs[currentIndex - 1];
   setTrack(nextTrack);

   MusicControl.updatePlayback({
      title: nextTrack?.title,
      artwork: track?.cover
         ? track.cover
         : require("../assets/images/images.jpeg"),
      elapsedTime: 0
   });
   MusicControl.setPlayback({
      state: MusicControl.STATE_PLAYING,
      duration: status?.duration
   });
};
