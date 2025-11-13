import { View, Text, Alert } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/application/store/stores";
import { useGetAllQuery } from "@/infrastructure/booking/booking.redux.api";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { TenantDashboardBookingStackParamList } from "./navigation/bookings.stack";
import StaticScreenWrapper from "@/components/layout/StaticScreenWrapper";
import { VStack, Box, Button } from "@gluestack-ui/themed";
import { GetBooking } from "@/infrastructure/booking/booking.schema";

//For approved or ongoing stays

export default function DashboardBookingsScreen() {
  const navigate =
    useNavigation<
      NativeStackNavigationProp<TenantDashboardBookingStackParamList>
    >();
  const user = useSelector((state: RootState) => state.tenants.selectedUser);
  if (!user?.id) {
    return () => {
      navigate.goBack();
      Alert.alert("Something went wrong!");
    };
  }

  //! apply search in here
  const [search, setSearch] = React.useState<number | undefined>(undefined);

  const {
    data: bookingArrays,
    isLoading: isBookingArraysLoading,
    isError: isBookingArraysError,
    refetch,
  } = useGetAllQuery({ tenantId: user.id, page: 1, offset: 10 });
  //! currently working for tenant side booking
  return (
    <StaticScreenWrapper>
      <VStack>
        <VStack
          style={{
            padding: 10,
          }}
        >
          {bookingArrays &&
            bookingArrays.map((book: GetBooking, id) => {
              return (
                <Box
                  key={id}
                  style={{
                    borderWidth: 4,
                    borderColor: "black",
                  }}
                >
                  <Box>
                    <Text>Room No.{book.room.roomNumber}</Text>
                  </Box>
                  <Button
                    onPress={() =>
                      navigate.navigate("DashboardBookingDetailsScreen", {
                        bookId: book.id,
                      })
                    }
                  >
                    <Text>Details</Text>
                  </Button>
                </Box>
              );
            })}
        </VStack>
      </VStack>
    </StaticScreenWrapper>
  );
}
