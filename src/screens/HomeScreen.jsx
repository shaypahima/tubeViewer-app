import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useContext } from 'react';
import { ThemeContext } from '../contexts/themeContext';

export default function HomeScreen() {
  const navigation = useNavigation();
  const { theme, toggleTheme, colors } = useContext(ThemeContext);

  return (
    <View className="flex-1 items-center justify-center" style={{ backgroundColor: colors.background }}>
      <Text style={{ color: colors.text }}>HomeScreen</Text>
      <Button
        title="Search"
        onPress={() => navigation.navigate('Search')}
      />
      <Button
        title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        onPress={() => toggleTheme(theme === 'light' ? 'dark' : 'light')}
      />
    </View>
  );
}
