import { createContext, useState, useEffect } from "react";
import { useColorScheme } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { colorPalettes } from "../constants/colorPalette";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const systemTheme = useColorScheme(); // get the system theme
  const [theme, setTheme] = useState(systemTheme || "light"); // set the theme to the system theme or light if not available

  useEffect(() => {
    // load the theme from the async storage
    const loadTheme = async () => {
      const storedTheme = await AsyncStorage.getItem("theme");
      if (storedTheme) {
        setTheme(storedTheme);
      }
    };
    loadTheme();
  }, []);

  const toggleTheme = async () => {
    // toggle the theme and save it to the async storage
    theme === "light" ? setTheme("dark") : setTheme("light");
    await AsyncStorage.setItem("theme", theme);
  };

  return (
    <ThemeContext.Provider 
      value={{ theme, toggleTheme, colors: colorPalettes[theme] }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
