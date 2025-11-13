import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { useRoute, RouteProp } from "@react-navigation/native";
import { TenantDashboardBookingStackParamList } from "./navigation/bookings.stack";
import { useGetOneQuery } from "@/infrastructure/booking/booking.redux.api";
import StaticScreenWrapper from "@/components/layout/StaticScreenWrapper";
import { Box, VStack } from "@gluestack-ui/themed";
import TenantBookingProgress from "@/features/shared/booking-progress/tenant-booking-progress/tenant.booking-progress";
import { GlobalStyle, Spacing } from "@/constants";
import FullScreenLoaderAnimated from "@/components/ui/FullScreenLoaderAnimated";
import { expoStorageCleaner } from "@/infrastructure/image/image.service";

type RouteProps = RouteProp<
  TenantDashboardBookingStackParamList,
  "DashboardBookingDetailsScreen"
>;

export default function DashboardBookingDetailsScreen() {
  React.useEffect(() => {
    return () => {
      expoStorageCleaner();
      // logExpoSystemDir();
    };
  }, []);

  const route = useRoute<RouteProps>();
  const { bookId } = route.params;

  const { data: bookingData, isLoading, isError } = useGetOneQuery(bookId);
  const tenantIdForBooking = bookingData?.tenantId;

  return (
    <StaticScreenWrapper
      style={[GlobalStyle.GlobalsContainer, s.container]}
      contentContainerStyle={[GlobalStyle.GlobalsContainer]}
    >
      <VStack>
        {isLoading && <FullScreenLoaderAnimated />}
        {tenantIdForBooking && (
          <Box>
            <TenantBookingProgress
              bookingId={bookId}
              tenantId={tenantIdForBooking}
            />
          </Box>
        )}
      </VStack>
    </StaticScreenWrapper>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacing.md,
  },
});
