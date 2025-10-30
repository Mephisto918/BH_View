import React from "react";
import {
  ViewStyle,
  TextStyle,
  StyleProp,
  Text,
  StyleSheet,
} from "react-native";
import { VStack } from "@gluestack-ui/themed";
import { Ionicons } from "@expo/vector-icons";
import { IoniconsIconType } from "@/constants/icons/IonIconsTypes";
import { Colors, Fontsize } from "@/constants";

/**
 * Props for the reusable ScreenHeaderComponent.
 *
 * This component provides a consistent screen header design
 * across your app. It can display an optional icon and a title text.
 */
export interface ScreenHeaderComponentProps {
  /**
   * Optional custom styles for the outer container.
   * You can use this to adjust padding, alignment, or margins.
   *
   * @example
   * ```tsx
   * <ScreenHeaderComponent containerStyle={{ paddingHorizontal: 16 }} />
   * ```
   */
  containerStyle?: StyleProp<ViewStyle>;

  /**
   * Optional icon configuration for the header.
   * If not provided, only the title text will be rendered.
   *
   * @example
   * ```tsx
   * icon={{
   *   iconName: "home-outline",
   *   color: Colors.primary,
   *   size: 36
   * }}
   * ```
   */
  icon?: {
    /** The Ionicons icon name (must match an existing Ionicon name). */
    iconName: IoniconsIconType;
    /** The color of the icon. Defaults to "white". */
    color?: string;
    /** The size of the icon in pixels. Defaults to 40. */
    size?: number;
  };

  /**
   * Text settings for the header label.
   * `textValue` is required; `textStyle` can override default styles.
   *
   * @example
   * ```tsx
   * text={{
   *   textValue: "Dashboard",
   *   textStyle: { fontSize: 32, color: "#fff" }
   * }}
   * ```
   */
  text: {
    /** The visible header title text. */
    textValue: string;
    /** Optional custom text style overrides. */
    textStyle?: StyleProp<TextStyle>;
  };
}

/**
 * A reusable header component for displaying screen titles and optional icons.
 *
 * Ideal for maintaining consistent header layouts across multiple screens.
 *
 * @component
 * @example
 * ```tsx
 * <ScreenHeaderComponent
 *   icon={{
 *     iconName: "business-outline",
 *     color: "white",
 *     size: 50,
 *   }}
 *   text={{
 *     textValue: "Dashboard",
 *   }}
 * />
 * ```
 */
export default function ScreenHeaderComponent({
  containerStyle,
  icon,
  text,
}: ScreenHeaderComponentProps) {
  return (
    <VStack style={[s.container, containerStyle]}>
      {icon && (
        <Ionicons
          name={icon.iconName}
          color={icon.color || "white"}
          size={icon.size || 40}
        />
      )}
      <Text style={[s.text, text.textStyle]}>{text.textValue}</Text>
    </VStack>
  );
}

const s = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  text: {
    color: Colors.TextInverse[2],
    fontWeight: "bold",
    fontSize: Fontsize.display1,
    marginBottom: 6,
    paddingLeft: 10,
    flexWrap: "wrap",
  },
});
