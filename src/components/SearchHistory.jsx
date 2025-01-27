import { Text, View, TouchableOpacity, FlatList } from "react-native";

export default function SearchHistory({ searchHistory, onSearchHistoryQuery, onClearHistory }) {
  return (
    <View className="flex-1 ml-5 mt-4">
      <View className="flex-row justify-between items-center">
        <Text className="text-lg font-bold">Search History</Text>
        <TouchableOpacity onPress={onClearHistory}>
          <Text className="text-lg underline pr-2">Clear</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={searchHistory}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => onSearchHistoryQuery(item)}
            className="my-1"
          >
            <Text className="text-lg font-medium">
              {item}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
