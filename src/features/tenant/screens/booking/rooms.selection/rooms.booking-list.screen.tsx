import React from "react";
import { Image, StyleSheet } from "react-native";
import { Box, Button, Text, View, VStack } from "@gluestack-ui/themed";
import StaticScreenWrapper from "@/components/layout/StaticScreenWrapper";
import { Colors, GlobalStyle } from "@/constants";
import FullScreenLoaderAnimated from "@/components/ui/FullScreenLoaderAnimated";
import { ScrollView } from "react-native-gesture-handler";
import { useGetOneQuery as useGetOneBoardingHouse } from "@/infrastructure/boarding-houses/boarding-house.redux.api";
import { GetRoom } from "../../../../../infrastructure/room/room.schema";
import { useRoute } from "@react-navigation/native";
import { RoomsBookingScreenRouteProp } from "../navigation/booking.types";

export default function RoomsBookingListScreen() {
  const route = useRoute<RoomsBookingScreenRouteProp>();
  const { paramsId } = route.params;

  const {
    data: boardingHouseData,
    isLoading: isBoardingHouseLoading,
    isError: isBoardingHouseError,
  } = useGetOneBoardingHouse(paramsId);
  const rooms = React.useMemo(
    () => boardingHouseData?.rooms ?? [],
    [boardingHouseData]
  ); // * to prevent creating a new empty array every render

  return (
    <StaticScreenWrapper style={[GlobalStyle.GlobalsContainer]}>
      {isBoardingHouseLoading && <FullScreenLoaderAnimated />}
      <VStack>
        <Box>
          <Text>Select Room</Text>
        </Box>
        <ScrollView
          style={{ backgroundColor: Colors.PrimaryLight[8], flex: 1 }}
          contentContainerStyle={{
            flexDirection: "column",
            justifyContent: "flex-start",
            gap: 10, // optional, RN 0.71+
            padding: 10,
          }}
        >
          {rooms &&
            rooms.map((room: GetRoom, index) => {
              return (
                <Box style={[s.item_container]} key={index}>
                  <Box style={[s.item_header]}>
                    <Text>{room.roomNumber}</Text>
                    <Image
                      source={
                        room.thumbnail
                          ? { uri: room?.thumbnail[0] }
                          : require("@/assets/static/1.jpg")
                      }
                    />
                  </Box>
                  <Box>
                    <Text>
                      {room.currentCapacity}/{room.maxCapacity}
                    </Text>
                    <Text>{room.roomType}</Text>
                  </Box>
                  <Box>
                    <Text>Price: {room.price}</Text>
                    <Button>
                      <Text>Details</Text>
                    </Button>
                    <Button>
                      <Text>Book Now</Text>
                    </Button>
                  </Box>
                </Box>
              );
            })}
        </ScrollView>
      </VStack>
    </StaticScreenWrapper>
  );
}

const s = StyleSheet.create({
  item_container: {
    borderWidth: 2,
    flexDirection: "row",
  },
  item_header: {},
});
