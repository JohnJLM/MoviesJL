import {
  View,
  Text,
  TouchableWithoutFeedback,
  Dimensions,
  Image,
} from "react-native";
import React from "react";
import { image500 } from "@/api/moviesdb";
import MyCarousel from "./MyCarousel";

var { width, height } = Dimensions.get("window");

export default function TrendingMovies({ data, navigation }) {
  const handleClick = (item) => {
    navigation.navigate("Movie", { item });
  };

  const movieCard = ({ item, index }) => (
    <View className={`flex items-center justify-center`} key={index}>
      <TouchableWithoutFeedback
        onPress={() => handleClick(item)}
        style={{
          display: "flex",
          flexDirection: "row",
          flex: 1,
          borderWidth: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={{ uri: image500(item["poster_path"]) }}
          style={{ width: width * 0.6, height: height * 0.4 }}
          className="rounded-3xl"
        />
      </TouchableWithoutFeedback>
    </View>
  );

  return (
    <View
      className="mb-8"
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <Text className="text-white text-xl mx-4 mb-5 ">Trending</Text>
      <MyCarousel data={data} renderItem={movieCard} autoplay={3000} />
    </View>
  );
}


