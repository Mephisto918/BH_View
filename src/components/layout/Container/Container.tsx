import React from "react";
import { ScrollView, RefreshControl, ViewStyle, StyleProp } from "react-native";

interface ContainerProps {
  refreshing?: boolean;
  onRefresh?: () => void;
  children: React.ReactNode;
  contentContainerStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
}

export default function Container({
  refreshing = false,
  onRefresh,
  children,
  contentContainerStyle,
  style,
}: ContainerProps) {
  return (
    <ScrollView
      nestedScrollEnabled
      style={style}
      contentContainerStyle={[
        { flexGrow: 1 }, // common default padding
        contentContainerStyle,
      ]}
      refreshControl={
        onRefresh ? (
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        ) : undefined
      }
    >
      {children}
    </ScrollView>
  );
}
