import React from "react";
import { View } from "@gluestack-ui/themed";
import { Colors, Spacing, BorderWidth, BorderRadius } from "../../constants";
import { Ionicons } from "@expo/vector-icons";
import { GlobalBottomNavigationStyles } from "@/constants/GlobalStyle";

export const CustomTabIcon = ({
  name,
  focused,
  color,
}: {
  name: any;
  focused: boolean;
  color: string;
}) => {
  return (
    <View
      style={{
        borderWidth: GlobalBottomNavigationStyles.iconBorderWidth,
        borderColor: focused
          ? GlobalBottomNavigationStyles.iconColorFocused
          : GlobalBottomNavigationStyles.iconColorNotFucused,
        backgroundColor: GlobalBottomNavigationStyles.iconBackgroundColor,
        aspectRatio: 1 / 1,
        height: GlobalBottomNavigationStyles.iconHeight,
        padding: Spacing.xs,
        borderRadius: BorderRadius.lg,
        justifyContent: "center",
        alignItems: "center",
        marginTop: focused
          ? GlobalBottomNavigationStyles.iconLiftHeightWhenFocused
          : GlobalBottomNavigationStyles.iconLiftHeightWhenNotFocused,
      }}
    >
      <Ionicons
        name={name}
        size={GlobalBottomNavigationStyles.iconSize}
        color={color}
      />
    </View>
  );
};
