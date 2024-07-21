import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Dimensions,
  FlatList,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const { width, height } = Dimensions.get("window");

const MyCarousel = ({ data, renderItem, autoplay }) => {
  const flatListRef = useRef(null);
  const scrollX = useSharedValue(0);
  const itemWidth = width * 0.7;
  const sideWidth = (width - itemWidth) / 2;
  const dataLength = data.length;
  const [currentIndex, setCurrentIndex] = useState(dataLength);

  // Duplicate the data to achieve looping
  const loopedData = [...data, ...data, ...data];

  const handleScrollEnd = (e) => {
    let newIndex = Math.round(e.nativeEvent.contentOffset.x / itemWidth);
    if (newIndex < dataLength) {
      newIndex = newIndex + dataLength;
      flatListRef.current.scrollToOffset({
        offset: newIndex * itemWidth,
        animated: false,
      });
    } else if (newIndex >= 2 * dataLength) {
      newIndex = newIndex - dataLength;
      flatListRef.current.scrollToOffset({
        offset: newIndex * itemWidth,
        animated: false,
      });
    }
    setCurrentIndex(newIndex);
  };

  useEffect(() => {
    let timer;
    if (autoplay) {
      timer = setInterval(() => {
        const nextIndex = (currentIndex + 1) % (dataLength * 2);
        flatListRef.current.scrollToOffset({
          offset: nextIndex * itemWidth,
          animated: true,
        });
        setCurrentIndex(nextIndex);
      }, autoplay);
    }
    return () => clearInterval(timer);
  }, [autoplay, currentIndex, dataLength, itemWidth]);

  return (
    <GestureHandlerRootView>
      <FlatList
        ref={flatListRef}
        data={loopedData}
        horizontal
        keyExtractor={(item, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: sideWidth }}
        snapToInterval={itemWidth}
        decelerationRate="fast"
        onMomentumScrollEnd={handleScrollEnd}
        initialScrollIndex={dataLength}
        getItemLayout={(data, index) => ({
          length: itemWidth,
          offset: itemWidth * index,
          index,
        })}
        renderItem={({ item, index }) => (
          <View
            style={{
              width: itemWidth,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {renderItem({ item, index: index % dataLength })}
          </View>
        )}
      />
    </GestureHandlerRootView>
  );
};

export default MyCarousel;
