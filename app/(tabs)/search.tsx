import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import useFetch from "@/hooks/useFetch";
import { fetchMovies } from "@/services/api";
import { updateSearchCount } from "@/services/movies";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
    fetchData: loadMovies,
    reset,
  } = useFetch(() => fetchMovies({ query: searchQuery }));

  const handleSearch = (text: string) => setSearchQuery(text);

  useEffect(() => {
    const searchTimeout = setTimeout(() => {
      const runSearch = async () => {
        if (searchQuery.trim()) {
          const results = await loadMovies();

          if (results?.[0]) {
            await updateSearchCount(searchQuery, results[0]);
          }
        } else {
          await reset();
        }
      };

      runSearch();
    }, 500);

    return () => clearTimeout(searchTimeout);
  }, [searchQuery]);

  const showResultsTitle =
    !moviesLoading &&
    !moviesError &&
    searchQuery.trim() &&
    movies?.length !== undefined &&
    movies?.length > 0;
  return (
    <View className="flex-1 bg-primary">
      <Image
        source={images.bg}
        className="flex-1 absolute w-full z-0"
        resizeMode="cover"
      />

      <FlatList
        data={movies}
        renderItem={({ item }) => <MovieCard {...item} />}
        keyExtractor={(item) => item.id.toString()}
        className="px-5"
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "flex-start",
          gap: 16,
          marginVertical: 16,
        }}
        contentContainerStyle={{
          paddingBottom: 100,
        }}
        ListHeaderComponent={
          <>
            <View className="w-full flex-row justify-center mt-20 items-center">
              <Image source={icons.logo} className="w-12 h-10" />
            </View>

            <View className="my-5">
              <SearchBar
                placeholder="Search for a movie"
                value={searchQuery}
                onChangeText={handleSearch}
              />
            </View>

            {moviesLoading && (
              <View className="flex-1 justify-center items-center mt-10">
                <ActivityIndicator size="large" color="#0000ff" />
              </View>
            )}

            {moviesError && (
              <View className="flex-1 justify-center items-center mt-10">
                <Text className="text-white text-lg font-semibold">
                  Something went wrong
                </Text>
                <Text className="text-white">{moviesError.message}</Text>
              </View>
            )}

            {showResultsTitle && (
              <Text className="text-xl text-white font-bold mt-4">
                Search Results for{" "}
                <Text className="text-accent">{searchQuery}</Text>
              </Text>
            )}
          </>
        }
        ListEmptyComponent={
          !moviesLoading && !moviesError ? (
            <View className="mt-10 px-5">
              <Text className="text-center text-gray-500">
                {searchQuery.trim()
                  ? "No movies found"
                  : "Start typing to search for movies"}
              </Text>
            </View>
          ) : null
        }
      />
    </View>
  );
};

export default Search;
