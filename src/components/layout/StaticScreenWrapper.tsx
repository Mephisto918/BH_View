import React from "react";
import {
  StyleSheet,
  StyleProp,
  ViewStyle,
  View,
  ScrollView,
  RefreshControl,
} from "react-native";
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

  // NEW
  refreshing?: boolean;
  onRefresh?: () => void;
}

export default function StaticScreenWrapper({
  children,
  style,
  bottomOffset = 0,
  scrollEnabled = true,
  keyboardShouldPersistTaps = "handled",
  showsVerticalScrollIndicator = true,
  contentContainerStyle,
  wrapInScrollView = true,

  refreshing = false,
  onRefresh,
}: Props) {
  const shouldUseNormalScroll = !!onRefresh; // if refresh enabled → use ScrollView

  if (!wrapInScrollView) {
    return <View style={[styles.container, style]}>{children}</View>;
  }

  return shouldUseNormalScroll ? (
    // -------------------------------------------
    // NORMAL SCROLLVIEW (supports refreshControl)
    // -------------------------------------------
    <ScrollView
      style={[styles.container, style]}
      contentContainerStyle={contentContainerStyle}
      scrollEnabled={scrollEnabled}
      showsVerticalScrollIndicator={showsVerticalScrollIndicator}
      refreshControl={
        onRefresh ? (
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        ) : undefined
      }
    >
      {children}
    </ScrollView>
  ) : (
    // -------------------------------------------
    // KEYBOARD-AWARE SCROLLVIEW (no refresh)
    // -------------------------------------------
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
