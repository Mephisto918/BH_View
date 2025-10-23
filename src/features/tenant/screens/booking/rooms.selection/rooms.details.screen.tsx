import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";
import StaticScreenWrapper from "@/components/layout/StaticScreenWrapper";
import FullScreenLoaderAnimated from "@/components/ui/FullScreenLoaderAnimated";
import { Box, Button, VStack } from "@gluestack-ui/themed";
import { useGetOneQuery } from "@/infrastructure/room/room.redux.api";
import ImageCarousel from "@/components/ui/ImageCarousel";
import { BorderRadius, Colors } from "@/constants";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { TenantBookingStackParamList } from "../navigation/booking.types";

type RoomsDetailsScreenProps = NativeStackScreenProps<
  TenantBookingStackParamList,
  "RoomsDetailsScreen"
>;

// interface RoomsDetailsScreenProps {
//   boardingHouseId: number;
//   roomId: number;
// }

export default function RoomsDetailsScreen({
  route,
  navigation,
}: RoomsDetailsScreenProps) {
  const { boardingHouseId, roomId } = route.params;

  if (!boardingHouseId || !roomId) {
    return <Text>Invalid room or boarding house</Text>;
  }

  // if (boardingHouseId && roomId) return "No Info about the room found";

  const {
    data: roomData,
    isLoading: isRoomDataLoading,
    isError: isRoomDataError,
  } = useGetOneQuery({ boardingHouseId, roomId });

  return (
    <StaticScreenWrapper style={[]}>
      {isRoomDataLoading && <FullScreenLoaderAnimated />}
      {roomData && (
        <VStack>
          <Box>
            <Text>{roomData.roomNumber}</Text>
          </Box>
          <ImageCarousel images={roomData.gallery ?? []}></ImageCarousel>
          <Box>
            <Box>
              <Text>{roomData.price}</Text>
            </Box>
            <Button>Book Now</Button>
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
                  <Text style={[s.generic_text]}>{item}</Text>
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
  generic_text: {},
});
