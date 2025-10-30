import { View, Text, StyleSheet, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import StaticScreenWrapper from "@/components/layout/StaticScreenWrapper";
import {
  BorderRadius,
  Colors,
  Fontsize,
  GlobalStyle,
  Spacing,
} from "@/constants";
import { Box, Button, Image, VStack } from "@gluestack-ui/themed";

import { ScrollView } from "react-native-gesture-handler";
import FullScreenLoaderAnimated from "@/components/ui/FullScreenLoaderAnimated";
import { useGetAllQuery } from "@/infrastructure/booking/booking.redux.api";
import { QueryBooking } from "../../../../infrastructure/booking/booking.schema";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { OwnerBookingStackParamList } from "./navigation/booking.types";
import { useGetOneQuery } from "@/infrastructure/boarding-houses/boarding-house.redux.api";
import { parseIsoDate } from "@/infrastructure/utils/parseISODate.util";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RouteProps = RouteProp<
  OwnerBookingStackParamList,
  "PropertiesBookingListsScreen"
>;

export default function PropertiesBookingListsScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<OwnerBookingStackParamList>>();

  const route = useRoute<RouteProps>();
  if (!route.params?.bhId) {
    throw new Error("Missing required parameter: bhId");
  }
  const { bhId } = route.params;

  const [bookingFilters, setBookingFilters] = useState<QueryBooking>({
    offset: 50,
    page: 1,
    boardingHouseId: bhId,
  });
  const {
    data: bookingList,
    isLoading: isBookingListLoading,
    isError: isBookingListError,
  } = useGetAllQuery(bookingFilters);

  const {
    data: boardingHouseData,
    isError: isBoardingHouseDataError,
    isLoading: isBoardingHouseDataLoading,
  } = useGetOneQuery(bhId);

  const handleGotoBookingDetails = (bookId: number) => {
    navigation.navigate("PropertiesDetailsScreen", { bookId: bookId });
  };

  return (
    <StaticScreenWrapper
      style={[GlobalStyle.GlobalsContainer]}
      contentContainerStyle={[GlobalStyle.GlobalsContentContainer]}
    >
      {boardingHouseData && (
        <Box>
          <Text>{boardingHouseData.name}</Text>
        </Box>
      )}
      {isBookingListLoading && <FullScreenLoaderAnimated />}
      <VStack>
        <ScrollView
          style={{ backgroundColor: Colors.PrimaryLight[8], flex: 1 }}
          contentContainerStyle={{
            flexDirection: "column",
            justifyContent: "flex-start",
            gap: 10, // optional, RN 0.71+
            padding: 10,
          }}
        >
          {bookingList && bookingList.length > 0 ? (
            bookingList.map((book, index) => (
              <Box key={index} style={[styles.container]}>
                <Box style={[styles.center_item]}>
                  <Text
                    style={[
                      styles.textColor,
                      styles.item_header,
                      { textAlign: "center" },
                    ]}
                  >
                    {book.roomId}
                  </Text>
                </Box>
                <Box style={[styles.body]}>
                  <Box style={[styles.infoBox]}>
                    <Text style={[styles.textColor]}>
                      Status: {book.status}
                    </Text>
                    <Text style={[styles.textColor]}>{book.reference}</Text>
                    <Text style={[styles.textColor]}>
                      Check In: {parseIsoDate(book.checkInDate)?.monthName}{" "}
                      {parseIsoDate(book.checkInDate)?.day}{" "}
                      {parseIsoDate(book.checkInDate)?.dayName}
                    </Text>
                    <Text style={[styles.textColor]}>
                      Check Out: {parseIsoDate(book.checkOutDate)?.monthName}{" "}
                      {parseIsoDate(book.checkOutDate)?.day}{" "}
                      {parseIsoDate(book.checkOutDate)?.dayName}
                    </Text>
                  </Box>
                  <Box style={[styles.cta]}>
                    <Button
                      onPress={() => handleGotoBookingDetails(book.id)}
                    >
                      <Text style={[styles.textColor]}>View Details</Text>
                    </Button>
                  </Box>
                </Box>
              </Box>
            ))
          ) : (
            <Text style={[styles.textColor]}>Booking Empty</Text>
          )}
        </ScrollView>
      </VStack>
    </StaticScreenWrapper>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // semi-transparent dark background
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000, // ensure it's above everything
  },
  container: {
    flexDirection: "column",
    backgroundColor: Colors.PrimaryLight[9],
    borderRadius: 10,
    padding: Spacing.md,
    gap: Spacing.sm,
  },
  body: {
    borderWidth: 3,
    flexDirection: "row",
    borderColor: "red",
  },
  infoBox: {
    borderWidth: 3,
    flexDirection: "column",
    borderColor: "red",
    flex: 1,
  },

  textColor: {
    color: Colors.TextInverse[2],
  },

  item_header: {
    fontSize: Fontsize.h1,
  },

  center_item: {
    justifyContent: "center",
    alignContent: "center",
  },

  cta: {
    marginLeft: "auto",
  },
});
