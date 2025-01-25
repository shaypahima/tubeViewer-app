import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useContext } from 'react';
import { ThemeContext } from '../contexts/themeContext';
import { Pressable } from 'react-native';

export default function ThemeSwitch(){

  const { toggleTheme, colors, theme } = useContext(ThemeContext);

  return(
    <Pressable onPress={toggleTheme} className="mr-5">
      <MaterialIcons name={theme === "dark" ? "wb-sunny" : "dark-mode"} size={30} color={colors.text} />
    </Pressable>
  )
}