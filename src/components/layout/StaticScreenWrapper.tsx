import React from "react";
import { StyleSheet, StyleProp, ViewStyle, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

interface Props {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  bottomOffset?: number;
  scrollEnabled?: boolean;
  showsVerticalScrollIndicator?: boolean;
  keyboardShouldPersistTaps?: "handled" | "always" | "never";
  wrapInScrollView?: boolean;
}

const StaticScreenWrapper = ({
  children,
  style,
  bottomOffset = 0,
  scrollEnabled = true,
  keyboardShouldPersistTaps = "handled",
  showsVerticalScrollIndicator = true,
  contentContainerStyle,
  wrapInScrollView = true,
}: Props) => {
  return (
    <>
      {wrapInScrollView ? (
        <KeyboardAwareScrollView
          style={[styles.container, style]}
          contentContainerStyle={contentContainerStyle}
          scrollEnabled={scrollEnabled}
          showsVerticalScrollIndicator={showsVerticalScrollIndicator}
          keyboardShouldPersistTaps={keyboardShouldPersistTaps}
          extraHeight={bottomOffset}
        >
          {children}
        </KeyboardAwareScrollView>
      ) : (
        <View style={[styles.container, style]}>{children}</View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default StaticScreenWrapper;
