import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useContext } from 'react';
import { ThemeContext } from '../contexts/themeContext';

export default function HomeScreen() {
  const navigation = useNavigation();
  const { theme, toggleTheme, colors } = useContext(ThemeContext);

  return (
    <View className="flex-1  " style={{ backgroundColor: colors.background }}>
      
      <Button
        title="Search"
        onPress={() => navigation.navigate('Search')}
      />
    </View>
  );
}
