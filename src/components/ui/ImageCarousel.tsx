import {
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Text,
  StyleProp,
  ViewStyle,
} from "react-native";
import React, { useState } from "react";
import { BackendImage } from "../../infrastructure/image/image.schema";
import {
  BorderRadius,
  BorderWidth,
  Colors,
  ShadowLight,
  Spacing,
} from "@/constants";

interface CarouselProps {
  images: Array<BackendImage | undefined>;
  variant?: "primary" | "secondary" | "fullBleed";
  containerStyle?: StyleProp<ViewStyle>;
  scrollStyle?: StyleProp<ViewStyle>;
}

export default function ImageCarousel({
  images,
  variant = "primary",
  scrollStyle,
  containerStyle,
}: CarouselProps) {
  const [imageIndex, setImageIndex] = useState(0);
  const [mainImage, setMainImage] = useState(0);
  // make 404 images report to not found in images

  const setSelectedIndex = (i: number) => {
    setImageIndex(i);
    setMainImage(i);
  };

  const variantStyle: Record<string, any> = {
    primary: {
      container: {
        flex: 1,
        borderColor: Colors.PrimaryLight[6],
        backgroundColor: Colors.PrimaryLight[7],
        borderWidth: BorderWidth.lg,
        borderRadius: BorderRadius.xl,
        overflow: "hidden",
        ...ShadowLight.xl,
      },
      mainImage: {
        height: 296,
        aspectRatio: 16 / 9,
        alignSelf: "center",
      },
      carousel: {
        padding: Spacing.md,
        gap: Spacing.base,
      },
      carousel_item_definition: {
        borderRadius: BorderRadius.md,
        borderColorSelected: Colors.PrimaryLight[2],
        borderColorNotSelected: Colors.PrimaryLight[9],
      },
      thumbnailSize: 80,
    },
    secondary: {
      container: {
        flex: 1,
        borderColor: Colors.PrimaryLight[8],
        backgroundColor: Colors.PrimaryLight[3],
        borderWidth: BorderWidth.lg,
        borderRadius: BorderRadius.xl,
        overflow: "hidden",
        ...ShadowLight.xl,
      },
      mainImage: {
        height: 296,
        aspectRatio: 16 / 9,
        alignSelf: "center",
      },
      carousel: {
        padding: Spacing.md,
        gap: Spacing.base,
      },
      carousel_item_definition: {
        borderRadius: BorderRadius.md,
        borderColorSelected: Colors.PrimaryLight[7],
        borderColorNotSelected: Colors.PrimaryLight[2],
      },
      thumbnailSize: 80,
    },
  };

  // g(images[mainImage]);

  return (
    <View style={[variantStyle[variant].container, containerStyle]}>
      {!images[mainImage] ? (
        <View
          style={[
            variantStyle[variant].mainImage,
            { justifyContent: "center", alignItems: "center" },
          ]}
        >
          <Text>Image not found</Text>
        </View>
      ) : (
        <Image
          source={{ uri: images[mainImage].url }}
          style={[variantStyle[variant].mainImage]}
          resizeMode="cover"
        />
      )}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[variantStyle[variant].carousel, scrollStyle]}
      >
        {/* immage render logic goes here,, configure first the layout */}
        {images ? (
          images.map((image, i) => (
            <TouchableOpacity key={i} onPress={() => setSelectedIndex(i)}>
              {!image ? (
                <Text
                  style={[{ justifyContent: "center", alignItems: "center" }]}
                >
                  Image not found
                </Text>
              ) : (
                <Image
                  source={
                    typeof images[i]?.url === "string"
                      ? { uri: images[i].url }
                      : images[i]?.url
                  }
                  style={{
                    width: variantStyle[variant].thumbnailSize,
                    height: variantStyle[variant].thumbnailSize,
                    borderRadius:
                      variantStyle[variant].carousel_item_definition
                        .borderRadius,
                    borderWidth: BorderWidth.md,
                    borderColor:
                      i === imageIndex
                        ? variantStyle[variant].carousel_item_definition
                            .borderColorSelected
                        : variantStyle[variant].carousel_item_definition
                            .borderColorNotSelected,
                    ...(i === imageIndex ? ShadowLight.xxl : {}),
                  }}
                />
              )}
            </TouchableOpacity>
          ))
        ) : (
          <Text>Images not found</Text>
        )}
      </ScrollView>
    </View>
  );
}
