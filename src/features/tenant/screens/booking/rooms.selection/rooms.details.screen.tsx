import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import React from "react";
import StaticScreenWrapper from "@/components/layout/StaticScreenWrapper";
import FullScreenLoaderAnimated from "@/components/ui/FullScreenLoaderAnimated";
import { Box, Button, VStack } from "@gluestack-ui/themed";
import { useGetOneQuery } from "@/infrastructure/room/rooms.redux.api";
import ImageCarousel from "@/components/ui/ImageCarousel";
import {
  BorderRadius,
  Colors,
  Fontsize,
  GlobalStyle,
  Spacing,
} from "@/constants";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { TenantBookingStackParamList } from "../navigation/booking.types";
import FullScreenErrorModal from "@/components/ui/FullScreenErrorModal";

type RoomsDetailsScreenProps = NativeStackScreenProps<
  TenantBookingStackParamList,
  "RoomsDetailsScreen"
>;

export default function RoomsDetailsScreen({
  route,
  navigation,
}: RoomsDetailsScreenProps) {
  const { boardingHouseId, roomId } = route.params;

  if (!boardingHouseId || !roomId) {
    return <Text>Invalid room or boarding house</Text>;
  }

  //!
  const {
    data: roomData,
    isLoading: isRoomDataLoading,
    isError: isRoomDataError,
    error: roomDataError,
  } = useGetOneQuery({ boardingHouseId, roomId });

  if (isRoomDataError) {
    console.log("Room data error:", roomDataError);
  }

  return (
    <StaticScreenWrapper
      style={[GlobalStyle.GlobalsContainer, s.container]}
      contentContainerStyle={[GlobalStyle.GlobalsContentContainer]}
    >
      {isRoomDataLoading && <FullScreenLoaderAnimated />}
      {isRoomDataError && <FullScreenErrorModal />}
      {roomData && (
        <VStack>
          <Box>
            <Text style={[s.textColor, { fontSize: Fontsize.display1 }]}>
              {roomData.roomNumber}
            </Text>
          </Box>
          <Box>
            <Image
              source={
                roomData?.thumbnail?.[0]?.url
                  ? { uri: roomData.thumbnail[0].url }
                  : require("@/assets/housesSample/1.jpg")
              }
              style={{
                margin: "auto",
                width: "98%",
                height: 200,
                borderRadius: BorderRadius.md,
              }}
            />
          </Box>
          <ImageCarousel images={roomData.gallery ?? []}></ImageCarousel>
          <Box>
            <Box>
              <Text style={[s.textColor]}>{roomData.price}</Text>
            </Box>
            <Button>
              <Text style={[s.textColor]}>Book Now</Text>
            </Button>
          </Box>
          <Box>
            <ScrollView
              style={{ height: 150 }}
              contentContainerStyle={{
                flexDirection: "row",
                flexWrap: "wrap",
                gap: 10,
                justifyContent: "flex-start",
                alignContent: "flex-start",
              }}
              nestedScrollEnabled={true} // important when inside another scrollable parent
              keyboardShouldPersistTaps="handled" // helps with form fields
            >
              {(roomData.tags ?? []).map((item, index) => (
                <Box
                  key={index}
                  style={{
                    borderRadius: BorderRadius.md,
                    padding: 5,
                    backgroundColor: Colors.PrimaryLight[6],
                  }}
                >
                  <Text style={[s.generic_text, s.textColor]}>{item}</Text>
                </Box>
              ))}
            </ScrollView>
          </Box>
        </VStack>
      )}
    </StaticScreenWrapper>
  );
}

const s = StyleSheet.create({
  container: {
    padding: Spacing.md,
  },
  generic_text: {},

  textColor: {
    color: Colors.TextInverse[2],
  },
});
