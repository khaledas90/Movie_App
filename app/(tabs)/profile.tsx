import SplashScreen from "@/components/SplashScreen";
import { UseAuth } from "@/context/AuthContext";
import { logout } from "@/services/auth";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";

const CustomItem = ({ title, data }: { title: string; data: any }) => {
  return (
    <View className="mb-2 bg-[#787878]  p-2 rounded-xl">
      <Text className="text-base text-white mb-1">{title}</Text>
      <Text className="text-lg font-medium text-white">{data || "—"}</Text>
    </View>
  );
};

const Profile = () => {
  const authContext = UseAuth();
  const router = useRouter();
  const [data, setData] = React.useState<any>(null);
  const { user, loading, setUser } = authContext;

  useEffect(() => {
    if (user) {
      setData(user);
    }
  }, [user]);

  if (!authContext) return <SplashScreen />;
  if (loading) return <SplashScreen />;
  if (!data) {
    return (
      <View className="flex-1 justify-center items-center bg-primary px-6">
        <Text className="text-xl font-bold text-white mb-4">
          You are not logged in.
        </Text>

        <TouchableOpacity
          onPress={() => router.push("/login/Login")}
          className="bg-blue-600 px-6 py-3 rounded-full mb-3 w-full"
        >
          <Text className="text-white text-center text-base font-semibold">
            Login
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/signup/Signup")}
          className="border border-blue-600 px-6 py-3 rounded-full w-full"
        >
          <Text className="text-blue-600 text-center text-base font-semibold">
            Register
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleLogout = async () => {
    await logout();
    setUser(null);
    Toast.show({
      type: "success",
      text1: "Logged out successfully",
      position: "bottom",
    });
    router.push("/login/Login");
  };

  return (
    <ScrollView className="flex-1 bg-primary px-6 py-10">
      <Text className="text-3xl font-bold text-gray-900 mb-6">My Profile</Text>

      <CustomItem title="Name" data={data.name} />
      <CustomItem title="Email" data={data.email} />
      <CustomItem title="Username" data={data.username} />
      <CustomItem title="Phone" data={data.phone} />
      <CustomItem title="Address" data={data.address} />
      <CustomItem title="Created At" data={data.$createdAt?.split("T")[0]} />
      <CustomItem title="Updated At" data={data.$updatedAt?.split("T")[0]} />

      <TouchableOpacity
        onPress={handleLogout}
        className="bg-red-600 mt-8 px-6 py-3 rounded-full"
      >
        <Text className="text-white bg-red p-3  text-center text-base font-semibold">
          Logout
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Profile;
