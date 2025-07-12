import React  from "react";
import { View } from "@gluestack-ui/themed";
import { Colors, Spacing, BorderWidth, BorderRadius } from "../../constants";
import { Ionicons, } from "@expo/vector-icons";

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
        borderWidth: BorderWidth.xs,
        borderColor: focused ? Colors.PrimaryLight[2] : Colors.PrimaryLight[5],
        backgroundColor: Colors.PrimaryLight[8],
        // backgroundColor: "red",
        aspectRatio: 1 / 1,
        height: 50,
        padding: Spacing.xs,
        borderRadius: BorderRadius.lg,
        justifyContent: "center",
        alignItems: "center",
        marginTop: focused ? -10 : 0,
      }}
    >
      <Ionicons name={name} size={35} color={color} />
    </View>
  );
};
