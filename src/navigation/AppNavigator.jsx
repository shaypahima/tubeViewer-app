import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import VideoScreen from '../screens/VideoScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'YouTube Viewer' }}
      />
      <Stack.Screen
        name="Video"
        component={VideoScreen}
        options={{ title: 'Video Details' }}
      />
    </Stack.Navigator>
  );
}