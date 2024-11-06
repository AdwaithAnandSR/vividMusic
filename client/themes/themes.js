import { Appearance } from "react-native";

const scheme = Appearance.getColorScheme();


const darkMode = {
   background: "#0a0a0a",
   text: "white",
   item: '#1e1e1e5a',
   playingItemHighlightColor: '#f71ed2ef',
   minimizedTrackColor: '#1a1a1aef',
   fullViewMusicControllerColor: 'black'
};

const lightMode = {
   background: "#ffffff",
   text: "black",
   item: '#dcdcdcef'
};

export const theme = scheme === "dark" ? darkMode : lightMode;
