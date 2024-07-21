import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
} from "react-native";
import React from "react";
import { fallbackMoviePoster, image185 } from "@/api/moviesdb";

var { width, height } = Dimensions.get("window");
export default function MovieList({ title, data, navigation, hideSeeAll }) {
  return (
    <View className="mb-8 space-y-4">
      <View className="mx-4 flex-row justify-between items-center">
        <Text className="text-white text-xl">{title}</Text>

        {!hideSeeAll && (
          <TouchableOpacity>
            <Text className="text-lg text-green-500">See All</Text>
          </TouchableOpacity>
        )}
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {data.map((item, index) => (
          <TouchableWithoutFeedback
            key={index}
            onPress={() => navigation.navigate("Movie", { item })}
          >
            <View className="space-y-1 mr-4">
              <Image
                className="rounded-3xl"
                // source={require("../assets/images/poster1.jpg")}
                source={{
                  uri: image185(item["poster_path"]) || fallbackMoviePoster,
                }}
                style={{ width: width * 0.33, height: height * 0.22 }}
              />
              <Text className="text-neutral-300 ml-1 text-center">
                {item["title"].length > 16
                  ? item["title"].slice(0, 16) + "..."
                  : item["title"]}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        ))}
      </ScrollView>
    </View>
  );
}
