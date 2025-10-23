import { View, StyleSheet, ColorValue } from "react-native";
import React from "react";
import { Spinner } from "@gluestack-ui/themed";

interface FullScreenLoaderAnimatedProps {
  spinnerColor?: ColorValue;
}

export default function FullScreenLoaderAnimated({
  spinnerColor = "white",
}: FullScreenLoaderAnimatedProps) {
  return (
    <View style={styles.overlay}>
      <Spinner size="large" color={spinnerColor} />
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // semi-transparent dark background
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000, // ensure it's above everything
  },
});
