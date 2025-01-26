import { View, Text } from "react-native";
import Button from "./Button";
import { ThemeContext } from "../../contexts/themeContext";
import { useContext } from "react";



export default function Pagination({ currentPage, onPageChange }) {
  const { colors } = useContext(ThemeContext);
  return (
    <View className="flex-row justify-around items-around p-4">
      <Button
        title="<"
        onPress={() => onPageChange('prev')}
        variant="primary"
      />
      <Text style={{ color: colors.text }} className="text-center text-lg font-bold">{currentPage}</Text>
      <Button
        title=">"
        onPress={() => onPageChange('next')}
        variant="primary"
      />
    </View>
  );
}