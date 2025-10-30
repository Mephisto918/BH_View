import React from "react";
import { Image, StyleSheet } from "react-native";
import { Box, Button, Text, View, VStack } from "@gluestack-ui/themed";
import StaticScreenWrapper from "@/components/layout/StaticScreenWrapper";
import { Colors, Fontsize, GlobalStyle, Spacing } from "@/constants";
import FullScreenLoaderAnimated from "@/components/ui/FullScreenLoaderAnimated";
import { ScrollView } from "react-native-gesture-handler";
import { useGetOneQuery as useGetOneBoardingHouse } from "@/infrastructure/boarding-houses/boarding-house.redux.api";
import { GetRoom } from "../../../../../infrastructure/room/rooms.schema";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  RoomsBookingScreenRouteProp,
  TenantBookingStackParamList,
} from "../navigation/booking.types";
import FullScreenErrorModal from "@/components/ui/FullScreenErrorModal";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export default function RoomsBookingListScreen() {
  const navigate =
    useNavigation<NativeStackNavigationProp<TenantBookingStackParamList>>();

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

  const gotoDetails = (roomId: number, bhId: number) => {
    navigate.navigate("RoomsDetailsScreen", {
      roomId: roomId,
      boardingHouseId: bhId,
    });
  };

  const gotoBooking = (roomId: number) => {
    navigate.navigate("RoomsCheckoutScreen", {
      roomId: roomId,
    });
  };

  return (
    <StaticScreenWrapper style={[GlobalStyle.GlobalsContainer]}>
      {isBoardingHouseLoading && <FullScreenLoaderAnimated />}
      {isBoardingHouseError && <FullScreenErrorModal />}
      <VStack
        style={{
          padding: Spacing.md,
        }}
      >
        <Box>
          <Text style={[s.textColor, { fontSize: Fontsize.display1 }]}>
            Select Room
          </Text>
        </Box>
        <ScrollView
          style={{ backgroundColor: Colors.PrimaryLight[8], flex: 1 }}
          contentContainerStyle={{
            flexDirection: "column",
            justifyContent: "flex-start",
            gap: 10, // optional, RN 0.71+
          }}
        >
          {rooms &&
            rooms.map((room: GetRoom, index) => {
              return (
                <Box style={[s.item_container]} key={index}>
                  <Box style={[s.item_header]}>
                    <Text style={[s.textColor, s.textBold]}>
                      {room.roomNumber}
                    </Text>
                    <Image
                      style={[s.item_header_img]}
                      source={
                        room?.thumbnail?.[0]?.url
                          ? { uri: room.thumbnail[0].url }
                          : require("../../../../../assets/housesSample/3.jpg")
                      }
                    />
                  </Box>
                  <Box style={[{ flex: 1 }]}>
                    <Box
                      style={[
                        {
                          flexDirection: "row",
                        },
                      ]}
                    >
                      <Text style={[s.textColor, s.textSm]}>
                        {room.currentCapacity}/{room.maxCapacity}
                      </Text>
                      <Text style={[{ marginLeft: "auto" }, s.textSm]}>
                        {room.roomType}
                      </Text>
                    </Box>
                    <Box style={[s.item_desc]}>
                      <Text
                        style={[s.textColor, s.textSm]}
                        numberOfLines={4}
                        ellipsizeMode="tail"
                      >
                        {room.description}
                      </Text>
                    </Box>
                  </Box>
                  <Box style={[s.item_cta]}>
                    <Text
                      style={[
                        s.textColor,
                        { marginLeft: "auto", fontSize: Fontsize.xs },
                        s.textBold,
                      ]}
                    >
                      Price: {room.price}
                    </Text>
                    <Button
                      onPress={() => gotoDetails(room.id, room.boardingHouseId)}
                    >
                      <Text style={[s.textColor, s.item_cta_buttons]}>
                        Details
                      </Text>
                    </Button>
                    <Button onPress={() => gotoBooking(room.id)}>
                      <Text style={[s.textColor, s.item_cta_buttons]}>
                        Book Now
                      </Text>
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
    borderRadius: 10,
    backgroundColor: Colors.PrimaryLight[9],
    padding: Spacing.sm,
    flexDirection: "row",
    gap: Spacing.sm,
  },
  item_header: {
    width: 125,
    height: 75,
    color: "white",
  },
  item_header_img: {
    width: "100%",
    height: "100%",
  },
  item_desc: {},
  item_cta: { marginLeft: "auto", padding: Spacing.xs, gap: Spacing.xs },
  item_cta_buttons: {
    // padding: Spacing.xs,
  },

  textColor: {
    color: Colors.TextInverse[2],
  },
  textSm: { fontSize: Fontsize.xs },
  textBold: {
    fontWeight: "900",
  },
});
