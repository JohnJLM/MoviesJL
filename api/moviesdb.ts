import axios from "axios";

const apiKey = process.env.EXPO_PUBLIC_API_KEY;

// EndPoints
const apiBase = "https://api.themoviedb.org/3";
const trendingMoviesEndPoint = `${apiBase}/trending/movie/day?language=en-US&api_key=${apiKey}`;
const upcomingMoviesEndPoint = `${apiBase}/movie/upcoming?language=en-US&page=1&api_key=${apiKey}`;
const topRatedMoviesEndPoint = `${apiBase}/movie/top_rated?language=en-US&page=1&api_key=${apiKey}`;

// Dynamic endpoints
// Movies
const movieDetailEndpoint = id => `${apiBase}/movie/${id}?api_key=${apiKey}`
const movieCreditsEndpoint = id => `${apiBase}/movie/${id}/credits?api_key=${apiKey}`
const similarMoviesEndpoint = id => `${apiBase}/movie/${id}/similar?api_key=${apiKey}`

// Persons
const personDetailEndpoint = id => `${apiBase}/person/${id}?api_key=${apiKey}`
const personMoviesEndpoint = id => `${apiBase}/person/${id}/movie_credits?api_key=${apiKey}`

// Search
const searchMoviesEndpoint = `${apiBase}/search/movie?api_key=${apiKey}`


export const image500 = (path) =>
  path ? `https://image.tmdb.org/t/p/w500${path}` : null;
export const image342 = (path) =>
  path ? `https://image.tmdb.org/t/p/w342${path}` : null;
export const image185 = (path) =>
  path ? `https://image.tmdb.org/t/p/w185${path}` : null;

export const fallbackMoviePoster =
  "https://salonlfc.com/wp-content/uploads/2018/01/image-not-found-1-scaled-1150x647.png";
export const fallbackPersonImage =
  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";

const apiCall = async (endpoint, params?) => {
  const options = {
    method: "GET",
    url: endpoint,
    params: params ? params : {},
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.log("error", error);
    return {};
  }
};

export const fetchTrendingMovies = () => {
  return apiCall(trendingMoviesEndPoint);
};

export const fetchUpcominggMovies = () => {
  return apiCall(upcomingMoviesEndPoint);
};

export const fetchTopRatedgMovies = () => {
  return apiCall(topRatedMoviesEndPoint);
};

export const fetchMovieDetails = (id) => {
  return apiCall(movieDetailEndpoint(id));
};

export const fetchMovieCredits = (id) => {
  return apiCall(movieCreditsEndpoint(id));
};

export const fetchSimilarMovies = (id) => {
  return apiCall(similarMoviesEndpoint(id));
};

export const fetchPersonDetail = (id) => {
  return apiCall(personDetailEndpoint(id));
};

export const fetchPersonMovies = (id) => {
  return apiCall(personMoviesEndpoint(id));
};

export const searchMovies = (params) => {
  return apiCall(searchMoviesEndpoint, params);
}
