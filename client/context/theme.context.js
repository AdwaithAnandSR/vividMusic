import { useState, useEffect, createContext, useContext } from "react";
import { Appearance } from "react-native";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
   const themeStyles = {
      light: {
         backgroundColor: "white",
         color: "black",
         listItem: "#264145"
      },
      dark: {
         backgroundColor: "black",
         color: "white",
         listItem: "#121212"
      }
   };

   const [styles, setStyles] = useState(
      themeStyles[Appearance.getColorScheme()] || themeStyles["light"]
   );

   useEffect(() => {
      const subscription = Appearance.addChangeListener(({ colorScheme }) => {
         setStyles(themeStyles[colorScheme] || themeStyles["light"]);
      });

      return () => subscription.remove();
   }, []);

   return (
      <ThemeContext.Provider value={{ styles }}>
         {children}
      </ThemeContext.Provider>
   );
};

export const useTheme = () => useContext(ThemeContext);
