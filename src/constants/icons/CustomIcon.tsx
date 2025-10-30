import React from "react";
import Svg, { Circle } from "react-native-svg";
import { OpaqueColorValue, ViewStyle } from "react-native";

export interface CustomIconTypesProps {
  iconName: CustomIconShapesTypes;
  size?: number;
  color?: OpaqueColorValue;
  style?: ViewStyle;
}

type CustomIconShapesTypes = "Circle";

interface ShapeProps {
  size?: number;
  color?: OpaqueColorValue;
  style?: ViewStyle;
}

const CircleIcon = ({ color = "white", size = 30, style }: ShapeProps) => {
  return (
    <Svg width={size} height={size} style={style}>
      <Circle cx={size / 2} cy={size / 2} r={size / 2} fill={color} />
    </Svg>
  );
};

export default function CustomIcon({
  iconName,
  color,
  size,
  style,
}: CustomIconTypesProps) {
  return <CircleIcon color={color} size={size} style={style} />;
}
