import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Platform,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeftIcon, HeartIcon } from "react-native-heroicons/outline";
import { LinearGradient } from "expo-linear-gradient";
import Cast from "@/components/Cast";
import MovieList from "@/components/MovieList";
import Loading from "@/components/Loading";

var { width, height } = Dimensions.get("window");
const ios = Platform.OS === "ios";

export default function MovieScreen({ navigation }) {
  const { params: item } = useRoute();
  const [isFavourite, setIsFavourite] = useState(false);
  const [cast, setCast] = useState([1, 2, 3, 4, 5, 6]);
  const [similarMovies, setSimilarMovies] = useState([1, 2, 3, 4, 5, 6]);
  const [loading, setLoading] = useState(false);
  let movieName = "Demon Slayer and the return on the Demon King";

  useEffect(() => {}, [item]);

  return (
    <ScrollView
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
              source={require("../assets/images/poster1.jpg")}
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
          {movieName}
        </Text>
        {/* Status , relese. runtime */}

        <Text className="text-neutral-400 font-semibold text-base text-center">
          Released * 2020 * 170 min
        </Text>

        {/* genres */}
        <View className="flex-row justify-center mx-4 space-x-2">
          <Text className="text-neutral-400 font-semibold text-base text-center">
            Action *
          </Text>
          <Text className="text-neutral-400 font-semibold text-base text-center">
            Thrill *
          </Text>
          <Text className="text-neutral-400 font-semibold text-base text-center">
            Comedy
          </Text>
        </View>

        {/* Description */}
        <Text className="text-neutral-400 mx-4 tracking-wide">
          Description. Tanjirou Kamado and his friends from the Demon Slayer
          Corps accompany Kyoujurou Rengoku, the Flame Hashira, to investigate a
          mysterious series of disappearances occurring inside a train. Little
          do they know that Enmu, one of the Twelve Kizuki, is also on board and
          has prepared a trap for them.
        </Text>
      </View>

      {/* cast */}
      <Cast cast={cast} navigation={navigation} />

      {/* Similar movies */}
      <MovieList
        title={"Similar Movies"}
        data={similarMovies}
        navigation={navigation}
        hideSeeAll
      />
    </ScrollView>
  );
}
