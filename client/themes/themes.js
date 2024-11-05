import { Appearance } from "react-native";

const scheme = Appearance.getColorScheme();


const darkMode = {
   background: "#0a0a0a",
   text: "white",
   item: '#1e1e1e5a',
   playingItemHighlightColor: '#f71ed2ef'
};

const lightMode = {
   background: "#ffffff",
   text: "black",
   item: '#dcdcdcef'
};

export const theme = scheme === "dark" ? darkMode : lightMode;
