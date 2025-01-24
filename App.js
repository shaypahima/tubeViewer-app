import "./global.css"
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { ThemeProvider } from './src/contexts/themeContext';
// Create a client
const queryClient = new QueryClient();

export default function App() {


  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <ThemeProvider>
        <SafeAreaView className="flex-1">
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>
        </SafeAreaView>
        </ThemeProvider>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}

