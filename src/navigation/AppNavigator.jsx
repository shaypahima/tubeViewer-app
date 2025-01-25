import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../screens/HomeScreen";
import VideoScreen from "../screens/VideoScreen";
import SearchScreen from "../screens/SearchScreen";
import { useContext } from "react";
import { ThemeContext } from "../contexts/themeContext";


const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const { theme, toggleTheme, colors } = useContext(ThemeContext);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: colors.primary },
          headerTintColor: colors.text,
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: "YouTube Viewer",
          }}
        />
        <Stack.Screen
          name="Video"
          component={VideoScreen}
          options={{
            title: "Video Details",
          }}
        />
        <Stack.Screen
          name="Search"
          component={SearchScreen}
          options={{
            title: "Search",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
