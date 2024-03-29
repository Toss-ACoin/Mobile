import React from "react";
import { Dimensions, Image, View } from "react-native";
import Carousel from "react-native-snap-carousel";

const { width } = Dimensions.get("window");


export const ImgCarousel = ({ imgArray }) => {
  const renderItem = ({ item }) => {
    return (
      <View style={{ height: "100%", width}}>
        <Image
          style={{ flex: 1, borderRadius: 10 }}
          resizeMode="cover"
          source={{ uri: item }}
        />
      </View>
    );
  };

  return (
    <Carousel
      layout={'default'}
      data={imgArray}
      renderItem={renderItem}
      sliderWidth={width}
      itemWidth={width}
    />
  );
};

