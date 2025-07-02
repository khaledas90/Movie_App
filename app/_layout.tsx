import { AuthProvider } from "@/context/AuthContext";
import { Stack } from "expo-router";
import { I18nManager } from "react-native";
import Toast from "react-native-toast-message";
import "./global.css";
export default function RootLayout() {
  if (I18nManager.isRTL) {
    I18nManager.allowRTL(false);
    I18nManager.forceRTL(false);
  }
  return (
    <AuthProvider>
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{ headerShown: false }}
        ></Stack.Screen>
        <Stack.Screen
          name="movies/[id]"
          options={{ headerShown: false }}
        ></Stack.Screen>
        <Stack.Screen
          name="login/Login"
          options={{ headerShown: false, title: "Login" }}
        ></Stack.Screen>
        <Stack.Screen
          name="signup/Signup"
          options={{ headerShown: false, title: "Sign Up" }}
        ></Stack.Screen>
      </Stack>
      <Toast />
    </AuthProvider>
  );
}
