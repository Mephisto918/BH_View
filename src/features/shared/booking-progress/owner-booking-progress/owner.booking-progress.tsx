import { View, Text, StyleSheet, Image, Alert } from "react-native";
import React from "react";
import { Box, Button, VStack } from "@gluestack-ui/themed";
import {
  useGetOneQuery,
  usePatchApproveBookingMutation,
  usePatchRejectBookingMutation,
  usePatchVerifyPaymentMutation,
} from "@/infrastructure/booking/booking.redux.api";
import { Input, InputField } from "@gluestack-ui/themed";
import { BookingStatusEnum } from "../../../../infrastructure/booking/booking.schema";
import { BorderRadius, Colors, Fontsize, Spacing } from "@/constants";

import RenderStateView from "../RenderStateView";
import useOwnertBookingProgress from "./config";
import { TextInput } from "react-native";
import AutoExpandingInput from "@/components/ui/AutoExpandingInputComponent";
import DecisionModal from "@/components/ui/DecisionModal";
import { useDecisionModal } from "@/components/ui/FullScreenDecisionModal";

export interface OwnerBookingProgressProps {
  bookingId: number;
  ownerId: number;
}

export default function OwnerBookingProgress({
  bookingId,
  ownerId,
}: OwnerBookingProgressProps) {
  // 1. STATE
  const [rejectApproveMessage, setRejectApproveMessage] = React.useState("");
  const [paymentMessage, setPaymentMessage] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [isMessageBoxVisible, setIsMessageBoxVisible] = React.useState(false);
  const [isMessageInputVisible, setMessageInputVisible] = React.useState(false);

  // 2. QUERIES & MUTATIONS — ALL UNCONDITIONAL
  const { data: bookingProgress, refetch: refetchBookingData } =
    useGetOneQuery(ownerId);

  const { initialApprovalState, paymentState, completedState } =
    useOwnertBookingProgress(bookingProgress) ?? {};
  if (!completedState) return null;

  const [approveAction, { isLoading, isError, isSuccess }] =
    usePatchApproveBookingMutation();
  const [rejectAction] = usePatchRejectBookingMutation();
  const [verifyPaymentAction] = usePatchVerifyPaymentMutation(); // ← MUST be here
  const { showModal } = useDecisionModal();

  // 3. HANDLERS — defined AFTER all hooks
  const handleRejectApproveAction = (answer: boolean) => {
    if (answer) {
      showModal({
        title: "Confirm Booking Approval",
        cancelText: "Cancel",
        confirmText: "Approve Booking",
        message:
          "Are you sure you want to approve this booking request? Once approved, the tenant will be notified and the booking will be confirmed.",
        onConfirm: async () => {
          try {
            const res = await approveAction({
              id: bookingId,
              payload: { ownerId, message: rejectApproveMessage },
            }).unwrap();

            refetchBookingData();
            console.log("Approve response:", res);
            Alert.alert("Booking approved successfully!");
          } catch (e) {
            console.log(e);
            Alert.alert("Something went wrong while approving booking.");
          }
        },
      });
    } else {
      showModal({
        title: "Reject Booking Request",
        cancelText: "Cancel",
        confirmText: "Reject Booking",
        message:
          "Do you really want to reject this booking? This action cannot be undone, and the tenant will be notified of the rejection.",
        onConfirm: async () => {
          try {
            const res = await rejectAction({
              id: bookingId,
              payload: { ownerId, reason: rejectApproveMessage },
            }).unwrap();
            refetchBookingData();
            console.log("Reject response:", res);
            Alert.alert("Booking rejected successfully!");
          } catch (e) {
            console.log(e);
            Alert.alert("Something went wrong while approving booking.");
          }
        },
      });
    }
  };

  const handlePaymentDecision = (answer: boolean) => {
    showModal({
      title: "Confirm Booking Approval",
      cancelText: "are you sure",
      message: "are you sure",
    });

    // const Status = answer
    //   ? BookingStatusEnum.enum.PAYMENT_VERIFIED
    //   : BookingStatusEnum.enum.REJECTED;
  };

  const handleGlobalDecisionModalToSubmit = () => {
    // verifyPaymentAction({
    //   id: bookingId,
    //   payload: { ownerId, remarks: paymentMessage, newStatus: Status },
    // });
    // refetchBookingData();
  };

  const hanleStopCrash = (answer: boolean) => {
    if (!answer) {
      console.log("Yawa");
      return;
    }
  };

  // 4. RENDER
  return (
    <VStack style={[s.container]}>
      <DecisionModal visible={isMessageBoxVisible} />
      <Text style={[s.textColor, { fontSize: Fontsize.display1 }]}>
        Booking Progress
      </Text>
      <RenderStateView
        onAction={handleRejectApproveAction}
        state={initialApprovalState}
        lockedStateContent={
          <Box style={{ gap: Spacing.md }}>
            <Text style={[s.textColor, { fontSize: Fontsize.h1 }]}>
              Booking Request
            </Text>
            {isMessageInputVisible && (
              <AutoExpandingInput
                style={s.Form_Input_Placeholder}
                value={message}
                onChangeText={setMessage}
                placeholder=""
                maxHeight={180} // optional, default 200
              />
            )}
            <Button
              onPress={() => setMessageInputVisible((prev) => !prev)}
              size="xs"
              style={[s.buttonStyle]}
            >
              <Text style={[s.textColor]}>Show Message Box</Text>
            </Button>
          </Box>
        }
      />
      <RenderStateView
        onAction={handlePaymentDecision}
        state={paymentState}
        lockedStateContent={
          <AutoExpandingInput
            style={s.Form_Input_Placeholder}
            value={paymentMessage}
            onChangeText={setPaymentMessage}
            placeholder="Payment remarks or reason"
            maxHeight={180} // optional, default 200
          />
        }
      />
      <RenderStateView
        onAction={handlePaymentDecision}
        state={completedState}
      />
    </VStack>
  );
}

const s = StyleSheet.create({
  container: {
    backgroundColor: Colors.PrimaryLight[9],
    shadowColor: Colors.PrimaryLight[10],
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 4.15,
    shadowRadius: 20,
    elevation: 10,
    borderRadius: BorderRadius.md,

    gap: Spacing.lg,
    padding: Spacing.sm,
  },
  Form_Input_Placeholder: {
    backgroundColor: Colors.PrimaryLight[6],
    color: Colors.TextInverse[2],
    fontSize: Fontsize.md,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.sm,
    borderRadius: BorderRadius.sm,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonStyle: {
    paddingVertical: Spacing.xs,
    backgroundColor: Colors.PrimaryLight[6],
  },

  textColor: {
    color: Colors.TextInverse[2],
  },
});
