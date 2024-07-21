import {
  Text,
  View,
  Platform,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import {
  Bars3CenterLeftIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/outline";
import TrendingMovies from "@/components/TrendingMovies";
import { useEffect, useState } from "react";
import MovieList from "@/components/MovieList";
import Loading from "@/components/Loading";
import {
  fetchTopRatedgMovies,
  fetchTrendingMovies,
  fetchUpcominggMovies,
} from "@/api/moviesdb";

var { width, height } = Dimensions.get("window");
const ios = Platform.OS === "ios";
export default function HomeScreen(props) {
  const [trending, setTrending] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = props.navigation;

  useEffect(() => {
    getTrendingMoies();
    getUpcomingMoies();
    getTopRatedMoies();
  }, []);

  const getTrendingMoies = async () => {
    const data = await fetchTrendingMovies();
    if (data && data.results) setTrending(data.results);
    setLoading(false);
  };

  const getUpcomingMoies = async () => {
    const data = await fetchUpcominggMovies();
    if (data && data.results) setUpcoming(data.results);
  };

  const getTopRatedMoies = async () => {
    const data = await fetchTopRatedgMovies();
    if (data && data.results) setTopRated(data.results);
  };
  return (
    <View className="flex-1 bg-neutral-800">
      {/* Search bar and logo */}
      <SafeAreaView className={ios ? "-mb-2" : "mb3"}>
        <View className="flex-row justify-between items-center mx-4 my-2">
          <Bars3CenterLeftIcon size={30} strokeWidth={2} color={"white"} />
          <Text className="text-white text-3xl font-bold ">
            Movies
            <Text className="text-green-500 "> JL</Text>
          </Text>

          <TouchableOpacity onPress={() => navigation.navigate("Search")}>
            <MagnifyingGlassIcon size={30} strokeWidth={2} color={"white"} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {loading ? (
        <View style={{ width, height: height * 0.9 }}>
          <Loading />
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={{ paddingBottom: 10 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Trending movies carousel */}
          {trending.length > 0 && <TrendingMovies data={trending} {...props} />}

          {/* Upcoming Movies Row */}
          {upcoming.length > 0 && (
            <MovieList title={"Upcoming"} data={upcoming} {...props} />
          )}

          {/* Top Rated Movies Row */}
          {topRated.length > 0 && (
            <MovieList title={"Top Rated"} data={topRated} {...props} />
          )}
        </ScrollView>
      )}
    </View>
  );
}
