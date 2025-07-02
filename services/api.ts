export const Api_Config = {
  baseUrl: "https://api.themoviedb.org/3",
  ApiKey: "b861945f893a34d1bf12f51064b87a83",
  headers: {
    accept: "application/json",
    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiODYxOTQ1Zjg5M2EzNGQxYmYxMmY1MTA2NGI4N2E4MyIsIm5iZiI6MTcxNzQxMDk1NC4yODQ5OTk4LCJzdWIiOiI2NjVkOWM4YWNjZmQ3MmQzYWIyMzI2ZDgiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.A9wDCpEzLPlTFsBJ3A1imk25yVR22oC_LiaZzLFwOR8`,
  },
};

export const fetchMovies = async ({
  query,
  page = 1,
}: {
  query: string;
  page?: number;
}): Promise<Movie[]> => {
  const endpoint =
    query && query.trim().length > 0
      ? `${Api_Config.baseUrl}/search/movie?query=${encodeURIComponent(query)}&page=${page}`
      : `${Api_Config.baseUrl}/movie/popular?page=${page}`;

  const response = await fetch(endpoint, {
    method: "GET",
    headers: Api_Config.headers,
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch movies: ${response.statusText}`);
  }

  const data = await response.json();
  return data.results;
};
  
export const fetchMovieDetails = async (
  movieId: string
): Promise<MovieDetails> => {
  try {
    const response = await fetch(
      `${Api_Config.baseUrl}/movie/${movieId}?api_key=${Api_Config.ApiKey}`,
      {
        method: "GET",
        headers: Api_Config.headers,
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch movie details: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    throw error;
  }
};
