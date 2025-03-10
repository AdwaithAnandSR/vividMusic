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

export const playNextSong = ({ allSongs, setTrack, track }) => {
  const currentIndex = allSongs.findIndex((song) => song._id === track?._id);
  const nextTrack =
    currentIndex === allSongs.length - 1
      ? allSongs[0]
      : allSongs[currentIndex + 1];
  setTrack(nextTrack);
};

export const playPrevSong = ({ allSongs, setTrack, track }) => {
  const currentIndex = allSongs.findIndex((item) => item._id === track?._id);

  const nextTrack =
    currentIndex === 0
      ? allSongs[allSongs.length - 1]
      : allSongs[currentIndex - 1];
  setTrack(nextTrack);
};
