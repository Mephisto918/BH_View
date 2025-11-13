import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { HStack } from "@gluestack-ui/themed";
import { GetBoardingHouse } from "@/infrastructure/boarding-houses/boarding-house.schema";
import { Colors, Fontsize } from "@/constants";
import { Ionicons } from "@expo/vector-icons";

interface PropertyCardProps {
  data: GetBoardingHouse;
}

export default function PropertyCard({ data }: PropertyCardProps) {
  return (
    <HStack
      style={{
        flexDirection: "row",
        gap: 10,
      }}
    >
      <Text style={[s.generic_text_lg]}>{data.name}</Text>
      <Text style={[s.generic_text_md]}>
        No. of Rooms: {data.rooms?.length}
      </Text>
    </HStack>
  );
}

const s = StyleSheet.create({
  generic_text_sm: {
    fontSize: Fontsize.sm,
    color: Colors.TextInverse[1],
  },
  generic_text_md: {
    fontSize: Fontsize.md,
    color: Colors.TextInverse[1],
  },
  generic_text_lg: {
    fontSize: Fontsize.lg,
    color: Colors.TextInverse[2],
  },
});

// create a card or container a ....
