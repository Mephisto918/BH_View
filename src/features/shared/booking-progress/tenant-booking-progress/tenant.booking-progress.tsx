import { View, Text, StyleSheet, Alert, Image, Pressable } from "react-native";
import React from "react";
import { Box, VStack } from "@gluestack-ui/themed";
import { BorderRadius, Colors, Fontsize } from "@/constants";
import { UserRole } from "@/infrastructure/user/user.types";
import RenderStateView from "../RenderStateView";
import {
  useCancelBookingMutation,
  useCreatePaymentProofMutation,
  useGetOneQuery,
} from "@/infrastructure/booking/booking.redux.api";
import { Ionicons } from "@expo/vector-icons";
import useTenantBookingProgressHook from "./config";
import { pickImageExpo } from "@/infrastructure/image/image.service";
import { AppImageFile } from "@/infrastructure/image/image.schema";

export interface TenantBookingProgressProps {
  bookingId: number;
  tenantId: number;
}

export default function TenantBookingProgress({
  bookingId,
  tenantId,
}: TenantBookingProgressProps) {
  const {
    data: bookingData,
    isLoading: isBookingLoading,
    isError: isBookingError,
    refetch: refetchBooking,
  } = useGetOneQuery(bookingId);

  const { initialApprovalState, completedState, paymentState } =
    useTenantBookingProgressHook(bookingData) || {};

  const [
    createPayment,
    {
      isLoading: isCreatePaymentLoading,
      isError: isCreatePaymentError,
      isSuccess: isCreatePaymentSuccess,
    },
  ] = useCreatePaymentProofMutation();

  const [
    cancelBookingAction,
    {
      isLoading: isCancelBookingLoading,
      isError: isCancelBookingError,
      isSuccess: isCancelBookingSuccess,
    },
  ] = useCancelBookingMutation();

  const [pickedImage, setPickedImage] = React.useState<AppImageFile>();

  const handlePickThumbnailImage = async () => {
    try {
      const picked = await pickImageExpo(1);
      console.log("Picked images:", picked);
      if (picked && picked.length > 0) {
        setPickedImage(picked[0]);
      }
      refetchBooking();
    } catch (err) {
      console.log("Pick error:", err);
      Alert.alert("Error", "Invalid image file");
    }
  };

  const handleRemoveThumbnailImage = () => {
    setPickedImage(undefined);
  };

  const handleSubmitPaymentProof = async (answer: boolean) => {
    if (!pickedImage) return Alert.alert("No image Picked!");

    try {
      createPayment({
        id: bookingId,
        payload: {
          paymentImage: pickedImage,
          tenantId: tenantId,
        },
      });
    } catch (e) {}
  };

  return (
    <View>
      {/* Inital Request */}
      <VStack>
        <RenderStateView onAction={() => {}} state={initialApprovalState} />
      </VStack>
      <VStack>
        {/* Payment Reciept */}
        <Pressable onPress={handlePickThumbnailImage}>
          <Box style={[s.pickImageStyle]}>
            {pickedImage ? (
              <Image
                source={{
                  uri: pickedImage.uri.startsWith("file://")
                    ? pickedImage.uri
                    : `file://${pickedImage.uri}`,
                }}
                style={{ width: "100%", height: "100%" }}
                alt="pickedImage"
              />
            ) : (
              <Text style={{ color: "#888" }}>Tap to upload</Text>
            )}
          </Box>
        </Pressable>
        <Pressable
          onPress={handleRemoveThumbnailImage}
          style={[s.removeImageStyle]}
        >
          <Box>
            <Ionicons name="close" color="white" size={15} />
          </Box>
        </Pressable>
        <RenderStateView
          onAction={handleSubmitPaymentProof}
          state={initialApprovalState}
        />
      </VStack>
      <VStack>
        {/* Completed */}
        <RenderStateView onAction={() => {}} state={completedState} />
      </VStack>
    </View>
  );
}

const s = StyleSheet.create({
  input: {
    paddingTop: 10,
    paddingBottom: 10,
    overflow: "scroll", // Ensure scrollbar appears
  },
  Form_Input_Placeholder: {
    color: Colors.TextInverse[2],
    fontSize: Fontsize.md,
  },
  pickImageStyle: {
    width: "75%",
    height: 200,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  removeImageStyle: {
    backgroundColor: Colors.PrimaryLight[8],
    position: "absolute",
    top: 10,
    left: 10,
    borderRadius: BorderRadius.circle,
    padding: 2,
  },
});
