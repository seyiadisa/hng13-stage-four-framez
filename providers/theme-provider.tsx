import { darkTheme, lightTheme, ThemeColors } from "@/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";
import { Appearance } from "react-native";

type ThemeContextApi = {
  theme: ThemeColors;
  setLightTheme: () => void;
  setDarkTheme: () => void;
  setSystemTheme: () => void;
};

const ThemeContext = createContext<ThemeContextApi | undefined>(undefined);

export const useTheme = () => {
  const theme = useContext(ThemeContext);

  if (!theme) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return theme;
};

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDark, setIsDark] = useState(Appearance.getColorScheme() === "dark");
  const theme = isDark ? darkTheme : lightTheme;

  useEffect(() => {
    (async function () {
      const savedTheme = await AsyncStorage.getItem("theme");

      if (savedTheme) {
        if (savedTheme !== "system") {
          setIsDark(savedTheme === "dark");
        }
      } else {
        AsyncStorage.setItem("theme", "system");
      }
    })();
  }, []);

  const setLightTheme = () => {
    AsyncStorage.setItem("theme", "light");
    setIsDark(false);
  };

  const setDarkTheme = () => {
    AsyncStorage.setItem("theme", "dark");
    setIsDark(true);
  };

  const setSystemTheme = () => {
    const isSystemDark = Appearance.getColorScheme() === "dark";
    AsyncStorage.setItem("theme", "system");
    setIsDark(isSystemDark);
  };

  return (
    <ThemeContext.Provider
      value={{ theme, setLightTheme, setDarkTheme, setSystemTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
