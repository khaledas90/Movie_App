import MovieCard from "@/components/MovieCard";
import { Pagination } from "@/components/Pagination";
import SearchBar from "@/components/SearchBar";
import SplashScreen from "@/components/SplashScreen";
import TrendingCard from "@/components/TrendingCard";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import useFetch from "@/hooks/useFetch";
import { fetchMovies } from "@/services/api";
import { getTrendingMovies } from "@/services/movies";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  Text,
  View,
} from "react-native";

export default function Index() {
  const router = useRouter();
  const [pages, setPages] = useState<number>(1);

  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
  } = useFetch(() => fetchMovies({ query: "", page: pages }), [pages]);

  const {
    data: trendingMovies,
    loading: trendingLoading,
    error: trendingError,
  } = useFetch(getTrendingMovies);

  if (moviesLoading || trendingLoading) return <SplashScreen />;
  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="w-full absolute z-0" />
      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 10, minHeight: "100%" }}
      >
        <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />
        {moviesLoading || trendingLoading ? (
          <ActivityIndicator
            size="large"
            color="#0000ff"
            className="mt-10 self-center"
          />
        ) : moviesError || trendingError ? (
          <Text className="text-white text-center min-h-screen mt-10">
            Error: {moviesError?.message || trendingError?.message}
          </Text>
        ) : (
          <View className="flex-1 mt-5 mb-36">
            <SearchBar
              onPress={() => {
                router.push("/search");
              }}
              placeholder="Search for a movie"
            />

            {trendingMovies && (
              <View className="mt-10">
                <Text className="text-lg text-white font-bold mb-3">
                  Trending Movies
                </Text>
                <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  className="mb-4 mt-3"
                  data={trendingMovies}
                  contentContainerStyle={{
                    gap: 26,
                  }}
                  renderItem={({ item, index }) => (
                    <TrendingCard movie={item} index={index} />
                  )}
                  keyExtractor={(item, index) => `${index}-movie`}
                  ItemSeparatorComponent={() => <View className="w-4" />}
                />
              </View>
            )}

            <>
              <Text className="text-lg text-white font-bold mt-5 mb-3">
                Latest Movies
              </Text>

              <FlatList
                data={movies}
                renderItem={({ item }) => <MovieCard {...item} />}
                keyExtractor={(item, index) => `${index}-movie`}
                numColumns={3}
                columnWrapperStyle={{
                  justifyContent: "flex-start",
                  gap: 20,
                  paddingRight: 5,
                  marginBottom: 10,
                }}
                className="mt-2 pb-10"
                scrollEnabled={false}
              />
            </>
            <Pagination pages={pages} setPages={setPages} />
          </View>
        )}
      </ScrollView>
    </View>
  );
}
