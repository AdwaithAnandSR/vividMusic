import { Appearance } from "react-native";

const scheme = Appearance.getColorScheme();

const darkMode = {
   background: "#0a0a0a",
   text: "white"
};

const lightMode = {
   background: "#ffffff",
   text: "black"
};

export const theme = scheme === "dark" ? darkMode : lightMode;
