import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Platform,
  Dimensions,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { ChevronLeftIcon, HeartIcon } from "react-native-heroicons/outline";
import MovieList from "@/components/MovieList";
import Loading from "@/components/Loading";
import { useRoute } from "@react-navigation/native";
import {
  fallbackPersonImage,
  fetchPersonDetail,
  fetchPersonMovies,
  image342,
} from "@/api/moviesdb";

var { width, height } = Dimensions.get("window");
const ios = Platform.OS === "ios";
const verticalMargin = ios ? "" : "py-4";

export default function PersonScreen({ navigation }) {
  const scrollViewRef = useRef(null);
  const { params: item } = useRoute();
  const personId = item?.["person"]?.["id"];
  const [isFavourite, setIsFavourite] = useState(false);
  const [person, setPerson] = useState({});
  const [personalMovies, setPersonalMovies] = useState([1, 2, 3, 4, 5, 6]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (scrollViewRef.current && person && person["id"]) {
      scrollViewRef.current.scrollTo({ y: 0, animated: true });
    }
    setLoading(true);
    getPersonDetail(personId);
    getPersonMovies(personId);
  }, [item]);

  const getPersonDetail = async (id) => {
    const data = await fetchPersonDetail(id);
    if (data) setPerson(data);
    setLoading(false);
  };

  const getPersonMovies = async (id) => {
    const data = await fetchPersonMovies(id);
    console.log(data, "movies");
    if (data && data.cast) setPersonalMovies(data.cast);
  };

  return (
    <ScrollView
      contentContainerStyle={{
        paddingBottom: 20,
      }}
      className="flex-1 bg-neutral-900"
    >
      {/* back button and movie poster */}
      <SafeAreaView
        className={
          "z-20 w-full flex-row justify-between items-center px-4 " +
          verticalMargin
        }
      >
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

      {/* Person detail */}
      {loading ? (
        <View style={{ width, height: height * 0.9 }}>
          <Loading />
        </View>
      ) : (
        <View>
          <View
            className="flex-row justify-center"
            style={{
              shadowColor: "gray",
              shadowRadius: 40,
              shadowOffset: { width: 0, height: 5 },
              shadowOpacity: 1,
            }}
          >
            <View className="items-center rounded-full overflow-hidden h-72 w-72 border-2 border-neutral-500 ">
              <Image
                source={{
                  uri: image342(
                    person?.["profile_path"] || fallbackPersonImage
                  ),
                }}
                style={{ width: width * 0.74, height: height * 0.43 }}
              />
            </View>
          </View>

          <View className="mt-6">
            <Text className="text-3xl text-white font-bold text-center">
              {person?.["name"]}
            </Text>
            <Text className="text-base text-neutral-500 text-center">
              {person?.["place_of_birth"]}
            </Text>
          </View>

          <View className="mx-3 p-4 mt-6 flex-row justify-between items-center bg-neutral-700 rounded-full">
            <View className="border-r-2 border-r-neutral-400 px-2 items-center">
              <Text className="text-white font-semibold">Gender</Text>
              <Text className="text-neutral-300 text-sm">
                {" "}
                {person?.["gender"] == 1 ? "Female" : "Male"}
              </Text>
            </View>
            <View className="border-r-2 border-r-neutral-400 px-2 items-center">
              <Text className="text-white font-semibold">Birthday</Text>
              <Text className="text-neutral-300 text-sm">
                {person?.["birthday"]}
              </Text>
            </View>
            <View className="border-r-2 border-r-neutral-400 px-2 items-center">
              <Text className="text-white font-semibold">Known for</Text>
              <Text className="text-neutral-300 text-sm">
                {person?.["known_for_department"]}
              </Text>
            </View>
            <View className=" px-2 items-center">
              <Text className="text-white font-semibold">Popularity</Text>
              <Text className="text-neutral-300 text-sm">
                {person?.["popularity"]?.toFixed(2)} %
              </Text>
            </View>
          </View>

          <View className="my-6 mx-4 space-y-2">
            <Text className="text-white text-lg ">Biography </Text>
            <Text className="text-neutral-400 tracking-wide">
              {person?.["biography"] || "N/A"}
            </Text>
          </View>

          {/* Movies */}

          <MovieList
            data={personalMovies}
            hideSeeAll
            title={"Movies"}
            navigation={navigation}
          />
        </View>
      )}
    </ScrollView>
  );
}
