import axios from "axios";
import { apiKey } from "../constants";

// EndPoints
const apiBase = "https://api.themoviedb.org/3";
const trendingMoviesEndPoint = `${apiBase}/trending/movie/day?language=en-US&api_key=${apiKey}`;
const upcomingMoviesEndPoint = `${apiBase}/movie/upcoming?language=en-US&page=1&api_key=${apiKey}`;
const topRatedMoviesEndPoint = `${apiBase}/movie/top_rated?language=en-US&page=1&api_key=${apiKey}`;

export const image500 = (path) =>
  path ? `https://image.tmdb.org/t/p/w500${path}` : null;
export const image342 = (path) =>
  path ? `https://image.tmdb.org/t/p/w342${path}` : null;
export const image185 = (path) =>
  path ? `https://image.tmdb.org/t/p/w185${path}` : null;

export const fallbackMoviePoster =
  "https://storyset.com/illustration/monster-404-error/cuate#FFCA27FF&hide=&hide=complete";
export const fallbackPersonImage =
  "https://storyset.com/illustration/404-error-with-a-cute-animal/cuate#FFFA27FF&hide=&hide=complete";

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

export const fectchTrendingMovies = () => {
  return apiCall(trendingMoviesEndPoint);
};

export const fectchUpcominggMovies = () => {
  return apiCall(upcomingMoviesEndPoint);
};

export const fectchTopRatedgMovies = () => {
  return apiCall(topRatedMoviesEndPoint);
};
