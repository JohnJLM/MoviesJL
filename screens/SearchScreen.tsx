import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
  Platform,
} from "react-native";
import React, { useCallback, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { XMarkIcon } from "react-native-heroicons/outline";
import Loading from "@/components/Loading";
import { debounce } from "lodash";
import { fallbackMoviePoster, image185, searchMovies } from "@/api/moviesdb";

var { width, height } = Dimensions.get("window");
const ios = Platform.OS === "ios";

export default function SearchScreen({ navigation }) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  let movieName = "Demon Slayer and the return on the Demon King";

  const handleSearch = (value) => {
    if (value && value.length > 2) {
      setLoading(true);
      searchMovies({
        query: value,
        include_adult: "false",
        language: "en-US",
        page: "1",
      }).then((data) => {
        setLoading(false);
        if (data && data.results) setResults(data.results);
      });
    } else {
      setLoading(false);
      setResults([]);
    }
  };

  const handleTextDebounce = useCallback(debounce(handleSearch, 500), []);

  return (
    <SafeAreaView className="bg-neutral-800 flex-1">
      <View className="mx-4 my-4 flex-row justify-between items-center border border-neutral-500 rounded-full">
        <TextInput
          className="pb-1 pl-6 flex-1 text-base font font-semibold text-white tracking-wider"
          placeholder="Search Movie"
          placeholderTextColor={"lightgray"}
          onChangeText={handleTextDebounce}
        />
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="rounded-full p-3 m-1 bg-neutral-500"
        >
          <XMarkIcon size={25} color={"white"} />
        </TouchableOpacity>
      </View>

      {/* Results */}

      {loading ? (
        <View style={{ width, height: height * 0.9 }}>
          <Loading />
        </View>
      ) : results.length > 0 ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 15 }}
          className="space-y-3"
        >
          <Text className="text-white font-semibold ml-1">
            Results ({results.length})
          </Text>

          <View className="flex-row justify-between flex-wrap">
            {results.map((item, index) => (
              <TouchableWithoutFeedback
                key={index}
                onPress={() => navigation.push("Movie", { item })}
              >
                <View className="space-y-2 mb-4">
                  <Image
                    className="rounded-3xl"
                    source={{
                      uri: image185(item?.poster_path) || fallbackMoviePoster,
                    }}
                    style={{ width: width * 0.44, height: height * 0.3 }}
                  />
                  <Text className="text-neutral-300 ml-1 text-center">
                    {item?.title.length > 22
                      ? item?.title.slice(0, 22) + "..."
                      : item?.title}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            ))}
          </View>
        </ScrollView>
      ) : (
        <View
          className="flex-row justify-center items-center"
          style={{ width, height: height * 0.7 }}
        >
          <Image
            source={require("../assets/images/3D-glasses-amico.png")}
            className="h-96 w-96 "
          />
        </View>
      )}
    </SafeAreaView>
  );
}
