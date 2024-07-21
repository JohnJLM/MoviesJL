import {
  View,
  Text,
  TouchableWithoutFeedback,
  Dimensions,
  Image,
} from "react-native";
import React from "react";
import Carousel from "react-native-reanimated-carousel";
import { image500 } from "@/api/moviesdb";

var { width, height } = Dimensions.get("window");
export default function TrendingMovies({ data, navigation }) {
  const handleClick = (item) => {
    navigation.navigate("Movie", { item });
  };

  return (
    <View className="mb-8">
      <Text className="text-white text-xl mx-4 mb-5 ">Trending</Text>
      <Carousel
        loop
        width={width}
        height={height * 0.39}
        // autoPlay={true}
        data={data}
        scrollAnimationDuration={1000}
        renderItem={({ index, item }) => (
          <View className={`flex items-center justify-center`}>
            <TouchableWithoutFeedback
              onPress={() => handleClick(item)}
              key={index}
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
                // source={require("../assets/images/poster1.jpg")}
                source={{ uri: image500(item["poster_path"]) }}
                style={{ width: width * 0.6, height: height * 0.4 }}
                className="rounded-3xl"
              />
            </TouchableWithoutFeedback>
          </View>
        )}
      />
    </View>
  );
}
