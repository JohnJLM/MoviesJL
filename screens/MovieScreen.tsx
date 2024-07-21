import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Platform,
  Image,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeftIcon, HeartIcon } from "react-native-heroicons/outline";
import { LinearGradient } from "expo-linear-gradient";
import Cast from "@/components/Cast";
import MovieList from "@/components/MovieList";
import Loading from "@/components/Loading";
import {
  fallbackMoviePoster,
  fetchMovieDetails,
  fetchMovieCredits,
  image500,
  fetchSimilarMovies,
} from "@/api/moviesdb";

var { width, height } = Dimensions.get("window");
const ios = Platform.OS === "ios";

export default function MovieScreen({ navigation }) {
  const scrollViewRef = useRef(null);
  const { params: item } = useRoute();
  const movieId = item?.["item"]?.["id"];
  const [isFavourite, setIsFavourite] = useState(false);
  const [cast, setCast] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState({});

  useEffect(() => {
    if (scrollViewRef.current && movie && movie["id"]) {
      scrollViewRef.current.scrollTo({ y: 0, animated: true });
    }
    setLoading(true);
    getMovieDetail(movieId);
    getMovieCredits(movieId);
    getSimilarMovies(movieId);
  }, [item]);

  const getMovieDetail = async (id) => {
    const data = await fetchMovieDetails(id);
    if (data) setMovie(data);
    setLoading(false);
  };

  const getMovieCredits = async (id) => {
    const data = await fetchMovieCredits(id);
    if (data && data.cast) setCast(data.cast);
  };

  const getSimilarMovies = async (id) => {
    const data = await fetchSimilarMovies(id);
    if (data && data.results) setSimilarMovies(data.results);
  };

  return (
    <ScrollView
      ref={scrollViewRef}
      contentContainerStyle={{
        paddingBottom: 20,
      }}
      className="flex-1 bg-neutral-900"
    >
      {/* back button and movie poster */}
      <View className="w-full">
        <SafeAreaView className="absolute z-20 w-full flex-row justify-between items-center px-4 ">
          <TouchableOpacity
            className="rounded-xl p-1 bg-green-500 "
            onPress={() => navigation.goBack()}
          >
            <ChevronLeftIcon size={28} strokeWidth={2.5} color={"white"} />
          </TouchableOpacity>
          <TouchableOpacity
            className="rounded-xl p-1 "
            onPress={() => setIsFavourite(!isFavourite)}
          >
            <HeartIcon
              size={35}
              color={isFavourite ? "#f8312f" : "white"}
              fill={isFavourite ? "#f8312f" : "transparent"}
            />
          </TouchableOpacity>
        </SafeAreaView>

        {loading ? (
          <View style={{ width, height: height * 0.9 }}>
            <Loading />
          </View>
        ) : (
          <View>
            <Image
              // source={require("../assets/images/poster1.jpg")}
              source={{
                uri: image500(movie?.["poster_path"]) || fallbackMoviePoster,
              }}
              style={{ width, height: height * 0.55 }}
            />

            <LinearGradient
              colors={["transparent", "rgba(23,23,23,0.8)", "rgba(23,23,23,1)"]}
              style={{ width, height: height * 0.4 }}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
              className="absolute bottom-0"
            />
          </View>
        )}
      </View>

      {/* Movie Details */}
      <View style={{ marginTop: -(height * 0.09) }} className="space-y-3">
        {/* title */}
        <Text className=" text-white text-center text-3xl font-bold tracking-wider">
          {movie?.["title"]}
        </Text>
        {/* Status , relese. runtime */}

        {movie?.["id"] ? (
          <Text className="text-neutral-400 font-semibold text-base text-center">
            {movie?.["status"]} • {movie?.["release_date"]?.split("-")[0]} •{" "}
            {movie?.["runtime"]} min
          </Text>
        ) : null}

        {/* genres */}
        <View className="flex-row justify-center mx-4 space-x-2">
          {movie?.["genres"]?.map((genre, index) => {
            let showDot = index + 1 != movie["genres"].length;
            return (
              <Text
                key={index}
                className="text-neutral-400 font-semibold text-base text-center"
              >
                {genre.name} {showDot ? "•" : null}
              </Text>
            );
          })}
        </View>

        {/* Description */}
        <Text className="text-neutral-400 mx-4 tracking-wide">
          {movie?.["overview"]}
        </Text>
      </View>

      {/* cast */}
      {cast.length > 0 && <Cast cast={cast} navigation={navigation} />}

      {/* Similar movies */}
      {similarMovies.length > 0 && (
        <MovieList
          title={"Similar Movies"}
          data={similarMovies}
          navigation={navigation}
          hideSeeAll
        />
      )}
    </ScrollView>
  );
}
