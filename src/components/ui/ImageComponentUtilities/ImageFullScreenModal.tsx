import React from "react";
import { Modal, Dimensions, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Box } from "@gluestack-ui/themed";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

interface Props {
  visible: boolean;
  imageUri: string | null;
  onClose: () => void;
}

export default function ImageFullScreenModal({
  visible,
  imageUri,
  onClose,
}: Props) {
  if (!visible || !imageUri) return null;

  // ✅ Universal URI handling (supports local + remote)
  const finalUri =
    imageUri.startsWith("http") || imageUri.startsWith("https")
      ? imageUri
      : imageUri.startsWith("file://")
      ? imageUri
      : `file://${imageUri}`;

  const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

  // Shared values for zoom & pan
  const scale = useSharedValue(1);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  // Pinch zoom gesture
  const pinchGesture = Gesture.Pinch()
    .onUpdate((e) => {
      scale.value = e.scale;
    })
    .onEnd(() => {
      if (scale.value < 1) scale.value = withTiming(1);
    });

  // Pan gesture (only when zoomed in)
  const panGesture = Gesture.Pan().onUpdate((e) => {
    if (scale.value > 1) {
      const maxTranslateX = (screenWidth * (scale.value - 1)) / 2;
      const maxTranslateY = (screenHeight * (scale.value - 1)) / 2;

      translateX.value = Math.min(
        Math.max(e.translationX, -maxTranslateX),
        maxTranslateX
      );
      translateY.value = Math.min(
        Math.max(e.translationY, -maxTranslateY),
        maxTranslateY
      );
    }
  });

  const combinedGesture = Gesture.Simultaneous(pinchGesture, panGesture);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { translateX: translateX.value },
      { translateY: translateY.value },
    ],
  }));

  return (
    <Modal transparent animationType="fade" onRequestClose={onClose}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Box style={styles.overlay}>
          <GestureDetector gesture={combinedGesture}>
            <Animated.Image
              source={{ uri: finalUri }}
              style={[styles.image, animatedStyle]}
              resizeMode="contain"
            />
          </GestureDetector>

          <Pressable onPress={onClose} style={styles.closeButton}>
            <Ionicons name="contract-sharp" size={24} color="white" />
          </Pressable>
        </Box>
      </GestureHandlerRootView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  closeButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "rgba(0,0,0,0.7)",
    borderRadius: 30,
    padding: 12,
    zIndex: 10,
  },
});
