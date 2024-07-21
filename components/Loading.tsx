import { View } from "react-native";
import React from "react";
import * as Progress from "react-native-progress";

export default function Loading() {
  return (
    <View className="absolute flex-row flex-1 w-full h-full justify-center items-center">
      <Progress.CircleSnail thickness={12} size={160} color={"#54db54"} />
    </View>
  );
}
