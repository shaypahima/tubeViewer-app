import "./global.css"
import AppNavigator from './src/navigation/AppNavigator';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { ThemeProvider } from './src/contexts/themeContext';
import { VideosProvider } from './src/contexts/videosContext';
// Create a client
const queryClient = new QueryClient();

export default function App() {


  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <ThemeProvider>
          <VideosProvider>
            <SafeAreaView className="flex-1">
                <AppNavigator />
            </SafeAreaView>
          </VideosProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}

