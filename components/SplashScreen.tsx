import React from "react";
import { ActivityIndicator, View } from "react-native";

export default function SplashScreen() {
  return (
    <View className="flex-1 justify-center items-center bg-primary">
      <ActivityIndicator size="large" color="#007bff" />
    </View>
  );
}
