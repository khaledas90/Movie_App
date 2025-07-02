import InputField from "@/components/InputField";
import { signup } from "@/services/auth";
import { useRouter } from "expo-router";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

interface SignUpFormValues {
  name: string;
  email: string;
  phone: string;
  password: string;
}

const SignUp = () => {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormValues>();

  const onSubmit = async (data: SignUpFormValues) => {
    try {
      await signup(data.name, data.email, data.password);
      Toast.show({
        type: "success",
        text1: "Account created successfully",
        position: "bottom",
      });
      router.push("/login/Login");
    } catch (error: any) {
      console.log(error);
      Toast.show({
        type: "error",
        text1: "Signup Failed",
        text2: error.message || "Something went wrong",
        position: "bottom",
      });
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-primary">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View className="flex-1 justify-center items-center px-6 py-10">
            <Text className="text-3xl font-bold text-white mb-6">Sign Up</Text>

            <View className="space-y-4 w-full">
              {/* Name */}
              <Controller
                control={control}
                name="name"
                rules={{ required: "Name is required" }}
                render={({ field: { onChange, value } }) => (
                  <InputField
                    placeholder="Name"
                    value={value}
                    onChangeText={onChange}
                    keyboardType="default"
                  />
                )}
              />
              {errors.name && (
                <Text className="text-red-500 text-sm">
                  {errors.name.message}
                </Text>
              )}

              {/* Email */}
              <Controller
                control={control}
                name="email"
                rules={{
                  required: "Email is required",
                  pattern: {
                    value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                    message: "Enter a valid email address",
                  },
                }}
                render={({ field: { onChange, value } }) => (
                  <InputField
                    placeholder="Email"
                    value={value}
                    onChangeText={onChange}
                    keyboardType="email-address"
                  />
                )}
              />
              {errors.email && (
                <Text className="text-red-500 text-sm">
                  {errors.email.message}
                </Text>
              )}

              {/* Password */}
              <Controller
                control={control}
                name="password"
                rules={{ required: "Password is required" }}
                render={({ field: { onChange, value } }) => (
                  <InputField
                    placeholder="Password"
                    value={value}
                    onChangeText={onChange}
                    secureTextEntry
                  />
                )}
              />
              {errors.password && (
                <Text className="text-red-500 text-sm">
                  {errors.password.message}
                </Text>
              )}
            </View>

            {/* Submit */}
            <TouchableOpacity
              onPress={handleSubmit(onSubmit)}
              disabled={isSubmitting}
              className="bg-blue-500 rounded-xl w-full py-3 mt-6"
            >
              <Text className="text-center text-white text-base font-semibold">
                {isSubmitting ? "Submitting..." : "Create Account"}
              </Text>
            </TouchableOpacity>

            {/* Redirect to Login */}
            <TouchableOpacity
              onPress={() => router.push("/login/Login")}
              className="mt-6"
            >
              <Text className="text-blue-300 text-sm">
                Already have an account? Login
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignUp;
