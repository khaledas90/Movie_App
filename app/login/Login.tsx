import { useRouter } from "expo-router";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

import InputField from "@/components/InputField";
import { login } from "@/services/auth";

type FormValues = {
  email: string;
  password: string;
};

const Login = () => {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    try {
      await login(data.email.trim(), data.password).then((res) => {
        console.log(res);
      });
      Toast.show({
        type: "success",
        text1: "Login successful",
        position: "bottom",
      });
      router.reload();
      router.push("/profile");
    } catch (error: any) {
      if (
        error?.message?.includes("email") ||
        error?.message?.includes("valid email")
      ) {
        setError("email", {
          type: "manual",
          message: "Invalid email address",
        });
      }

      Toast.show({
        type: "error",
        text1: "Login failed",
        text2: error?.message || "Please check your credentials",
        position: "bottom",
      });
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-primary">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex-1 w-full justify-center items-center px-6 py-10">
          <Text className="text-3xl font-bold text-white mb-6">Sign in</Text>

          <View className="space-y-4 w-full">
            {/* Email */}
            <Controller
              control={control}
              name="email"
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                  message: "Please enter a valid email",
                },
              }}
              render={({ field: { onChange, value } }) => (
                <InputField
                  placeholder="Email"
                  keyboardType="email-address"
                  value={value}
                  onChangeText={onChange}
                />
              )}
            />
            {errors.email && (
              <Text className="text-red-500">{errors.email.message}</Text>
            )}

            {/* Password */}
            <Controller
              control={control}
              name="password"
              rules={{ required: "Password is required" }}
              render={({ field: { onChange, value } }) => (
                <InputField
                  placeholder="Password"
                  secureTextEntry
                  value={value}
                  onChangeText={onChange}
                />
              )}
            />
            {errors.password && (
              <Text className="text-red-500">{errors.password.message}</Text>
            )}
          </View>

          {/* Login Button */}
          <TouchableOpacity
            onPress={handleSubmit(onSubmit)}
            disabled={isSubmitting}
            className="bg-blue-500 rounded-xl w-full py-3 mt-4"
          >
            <Text className="text-center text-white text-base font-semibold">
              {isSubmitting ? "Logging in..." : "Login"}
            </Text>
          </TouchableOpacity>

          {/* Signup Redirect */}
          <TouchableOpacity
            onPress={() => {
              router.push("/signup/Signup");
            }}
            className="mt-6"
          >
            <Text className="text-blue-500 text-sm">
              Don’t have an account? Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;
