import React from "react";
import { KeyboardTypeOptions, TextInput, View } from "react-native";

interface InputFieldProps {
  placeholder: string;
  secureTextEntry?: boolean;
  onChangeText?: (text: string) => void;
  onPress?: () => void;
  value?: string;
  keyboardType?: KeyboardTypeOptions;
}
const InputField = ($: InputFieldProps) => {
  return (
    <View className="my-2">
      <TextInput
        className="bg-white  rounded-xl w-full  px-5 py-3"
        placeholder={$?.placeholder}
        placeholderTextColor="#A8B5DB"
        secureTextEntry={$?.secureTextEntry}
        onChangeText={$?.onChangeText}
        onPressIn={$?.onPress}
        value={$?.value}
        keyboardType={$?.keyboardType}
        autoCapitalize="none"
      />
    </View>
  );
};

export default InputField;
