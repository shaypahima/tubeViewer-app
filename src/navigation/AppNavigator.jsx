import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import VideoScreen from '../screens/VideoScreen';
import SearchScreen from '../screens/SearchScreen';
import { useContext } from 'react';
import { ThemeContext } from '../contexts/themeContext';
import { Button } from 'react-native';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const { theme, toggleTheme, colors } = useContext(ThemeContext);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'YouTube Viewer',
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.text,
          headerRight: () => (
            <Button
              title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              onPress={() => toggleTheme(theme === 'light' ? 'dark' : 'light')}
              color={colors.primary}
            />
          ),
        }}
      />
      <Stack.Screen
        name="Video"
        component={VideoScreen}
        options={{
          title: 'Video Details',
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.text,
          headerRight: () => (
            <Button
              title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              onPress={() => toggleTheme(theme === 'light' ? 'dark' : 'light')}
              color={colors.primary}
            />
          ),
        }}
      />
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{
          title: 'Search',
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.text,
          headerRight: () => (
            <Button
              title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              onPress={() => toggleTheme(theme === 'light' ? 'dark' : 'light')}
              color={colors.primary}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}