import {  SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function Layout({ children }) {
  return (
      <SafeAreaView>
        <LinearGradient
          colors={['#800080', '#4B0082']}
          style={{ flex: 1 }}
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 1 }}
        >
          {children}
          <StatusBar style="auto" />
        </LinearGradient>
      </SafeAreaView>

  );
}
