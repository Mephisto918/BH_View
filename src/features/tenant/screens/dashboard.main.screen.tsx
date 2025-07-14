import { View, Text, StyleSheet } from "react-native";
import { Box } from "@gluestack-ui/themed";
import React from "react";
import StaticScreenWrapper from "@/components/layout/StaticScreenWrapper";

import {
  Colors,
  Fontsize,
  GlobalStyle,
  Spacing,
  BorderRadius,
} from "@/constants";
import { VStack } from "@gluestack-ui/themed";

// redux
// import { useDispatch } from "react-redux";
import { useDynamicUserApi } from "@/infrastructure/user/user.hooks";

export default function DashboardMainScreen() {
  // const dispatch = useDispatch();
  const { selectedUser: user } = useDynamicUserApi();

  return (
    <StaticScreenWrapper
      style={[GlobalStyle.GlobalsContainer, s.StaticScreenWrapper]}
      contentContainerStyle={[GlobalStyle.GlobalsContentContainer]}
    >
      <VStack
        style={{
          // justifyContent: "center",
          // alignItems: "center",
          gap: Spacing.lg,
        }}
      >
        <VStack style={[s.Hero]}>
          <Text style={[s.Hero_text1]}> Hello {user?.firstname}!</Text>
          <Text style={[s.Hero_text1]}> Discover Places Around You!</Text>
        </VStack>
        <VStack style={[s.Widget]}>
          <Box style={[s.Widget_item]}>
            <Text style={[s.generic_text_lg]}>Pending Bookings 23</Text>
          </Box>
          <Box style={[s.Widget_item]}>
            <Text style={[s.generic_text_lg]}>Bookign History</Text>
          </Box>
          <Box style={[s.Widget_item]}>
            <Text style={[s.generic_text_lg]}>Payment Status</Text>
          </Box>
          <Box style={[s.Widget_item]}>
            <Text style={[s.generic_text_lg]}>Cancel Booking</Text>
          </Box>
          <Box style={[s.Widget_item]}>
            <Text style={[s.generic_text_lg]}>Bookmarks</Text>
          </Box>
        </VStack>
      </VStack>
    </StaticScreenWrapper>
  );
}

const s = StyleSheet.create({
  StaticScreenWrapper: {
    // backgroundColor: Colors.PrimaryLight[8],
    padding: 10,
  },
  Hero: {
    // borderColor: "red",
    // borderWidth: 3,
  },
  Hero_text1: {
    fontSize: Fontsize.h2,
    fontWeight: "bold",
    color: Colors.TextInverse[2],
  },
  Widget: {
    // borderColor: 'red',
    // borderWidth: 3
    gap: 10,
  },
  Widget_item: {
    // borderColor: 'green',
    // borderWidth: 3,
    borderRadius: BorderRadius.md,
    justifyContent: "center",
    alignItems: "flex-start",
    padding: 10,
    height: 50,
    width: "100%",
    backgroundColor: Colors.PrimaryLight[9],
  },

  generic_text_sm: {
    fontSize: Fontsize.sm,
    color: Colors.TextInverse[2],
  },
  generic_text_md: {
    fontSize: Fontsize.md,
    color: Colors.TextInverse[2],
  },
  generic_text_lg: {
    fontSize: Fontsize.lg,
    color: Colors.TextInverse[2],
  },
});
