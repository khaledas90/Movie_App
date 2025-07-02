import { icons } from "@/constants/icons";
import React from "react";
import { Image, TextInput, View } from "react-native";

interface Props {
  placeholder: string;
  value?: string;
  onChangeText?: (text: string) => void;
  onPress?: () => void;
}
const SearchBar = ($: Props) => {
  return (
    <View className="flex-row  items-center bg-dark-200 rounded-full px-5 py-3">
      <Image
        source={icons.search}
        className="w-5 h-5"
        resizeMode="contain"
        tintColor="#AB8BFF"
      />
      <TextInput
        value={$.value}
        onChangeText={$.onChangeText}
        placeholder={$.placeholder}
        onPress={$.onPress}
        className="flex-1 ml-2 focus:border-none focus:outline-none text-white"
        placeholderTextColor="#A8B5DB"
      />
    </View>
  );
};

export default SearchBar;
