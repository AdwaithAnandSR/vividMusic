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
   if(!track || !status) return
   
   MusicControl.setNowPlaying({
      state: MusicControl.STATE_PLAYING,
      title: track?.title,
      artwork: track?.cover ? track.cover : require('../assets/images/images.jpeg'),
      duration: status?.duration / 1000,
      elapsedTime: status?.currentTime / 1000,
      color: 0x3ef6bf,
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
};

export const playPrevSong = ({ allSongs, setTrack, track }) => {
   const currentIndex = allSongs.findIndex(item => item._id === track?._id);
   if (currentIndex === 0) setTrack(allSongs[allSongs.length - 1]);
   else setTrack(allSongs[currentIndex - 1]);
};
