import { View, Text } from "react-native";
import React from "react";

export default function DashboardBookingDetailsScreen() {
  const route = useRoute<RouteProps>();
    const {bookId} = route.params
  return (
    <View>
      <Text>dashboard.booking.details.screen</Text>
    </View>
  );
}
