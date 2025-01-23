import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const navigation = useNavigation();
  return (
    <View className="flex-1 items-center justify-center">
      <Text>HomeScreen</Text>
      <Button
        title="Search"
        onPress={() => navigation.navigate('Search')}
      />
    </View>
  )
}
