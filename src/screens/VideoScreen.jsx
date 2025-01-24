import { View, Text } from 'react-native';
import { useContext } from 'react';
import { ThemeContext } from '../contexts/themeContext';

export default function VideoScreen() {
  const { colors } = useContext(ThemeContext);

  return (
    <View style={{ backgroundColor: colors.background }}>
      <Text style={{ color: colors.text }}>VideoScreen</Text>
    </View>
  );
}