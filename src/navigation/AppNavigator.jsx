import { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { ThemeContext } from "../contexts/themeContext";

import ThemeSwitch from "../components/ThemeSwitch";
import HomeScreen from "../screens/HomeScreen";
import VideoScreen from "../screens/VideoScreen";
import SearchScreen from "../screens/SearchScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const { colors } = useContext(ThemeContext);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: colors.accent },
          headerTintColor: colors.text,
          headerRight: () => <ThemeSwitch />,
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
