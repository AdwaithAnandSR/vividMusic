import { Audio } from "expo-av";

const handlePlaySong = async ({uri, setTrack, track, handlePlayBackStatusChange }) => {
      try {
         if (track) {
            await track.unloadAsync();
            setTrack(null);
         }
         const { sound: newSound } = await Audio.Sound.createAsync(
            { uri },
            { shouldPlay: true }
         );
         newSound.setOnPlaybackStatusUpdate(handlePlayBackStatusChange)
         setTrack(newSound);
         await newSound.playAsync();
      } catch (error) {
         console.error("Error playing sound:", error);
      }
   };
   
   
   export default handlePlaySong