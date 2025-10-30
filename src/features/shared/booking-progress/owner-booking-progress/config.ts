import { GetBooking } from "@/infrastructure/booking/booking.schema";
import { RenderStateViewProps } from "../RenderStateView";

export default function useOwnertBookingProgress(
  bookingData: GetBooking | null | undefined
) {
  if (!bookingData) return null;

  // 🔧 Testing fallback (force any status you want)
  const status = bookingData?.status;
  // PENDING => CONFIRMED => AWAITING_PAYMENT => PAYMENT_VERIFIED => COMPLETED => REJECTED => CONFIRMED
  // const status = "PAYMENT_VERIFIED"; // fallback for testing

  // Booking status flags for readability
  const isPending = status === "PENDING";
  const isAwaitingPayment = status === "AWAITING_PAYMENT";
  const isPaymentVerified = status === "PAYMENT_VERIFIED";
  const isCompleted = status === "COMPLETED";
  const isRejected = status === "REJECTED";
  const isConfirmed = status === "CONFIRMED";

  // Debug info
  console.log("progress State:", status);

  // Color presets
  const rejectColorConfig = {
    textColor: "#f5f3f4",
    bgColor: "#e5383b",
    iconColor: "#ba181b",
  };

  const pendingColorConfig = {
    textColor: "#ddb892",
    bgColor: "#b08968",
    iconColor: "#7f5539",
  };

  const completedColorConfig = {
    textColor: "#f2e8cf",
    bgColor: "#6a994e",
    iconColor: "#386641",
  };

  const onProcessColorConfig = {
    textColor: "#fafdf6",
    bgColor: "#76520e",
    iconColor: "#b69121",
  };

  // Utility for consistent message reuse
  const rejectedMessage =
    bookingData?.ownerMessage || "Booking was rejected for testing.";

  // Helper for color selection (forces red for rejected)
  const getColorConfig = () =>
    isRejected
      ? rejectColorConfig
      : isPending
      ? pendingColorConfig
      : isAwaitingPayment || isConfirmed
      ? onProcessColorConfig
      : completedColorConfig;

  //
  // INITIAL APPROVAL STATE
  //
  const initialApprovalState: RenderStateViewProps["state"] = {
    isLocked: !isPending,
    message: isRejected
      ? rejectedMessage
      : isPending
      ? "Tenant has sent a booking request."
      : "You have accepted the booking request.",
    lockedBgColor: getColorConfig().bgColor,
    lockedTextColor: getColorConfig().textColor,
    icon: {
      iconProducer: "Ionicons",
      iconName: isRejected
        ? "close-circle"
        : isPending
        ? "hourglass"
        : "checkbox",
      color: getColorConfig().iconColor,
      size: 32,
    },
  };

  //
  // PAYMENT STATE
  //
  const paymentState: RenderStateViewProps["state"] = {
    isLocked: !isAwaitingPayment,
    message: isRejected
      ? rejectedMessage
      : isPending
      ? "Tenant has sent a booking request."
      : isAwaitingPayment
      ? "Waiting for tenant payment receipt."
      : isPaymentVerified || isCompleted
      ? "You have accepted the booking Payment Receipt."
      : "Waiting for tenant payment receipt.",
    lockedBgColor: getColorConfig().bgColor,
    lockedTextColor: getColorConfig().textColor,
    icon: {
      iconProducer: "Ionicons",
      iconName: isRejected
        ? "close-circle"
        : isPaymentVerified || isCompleted
        ? "checkbox"
        : "hourglass",
      color: getColorConfig().iconColor,
      size: 32,
    },
  };

  //
  // COMPLETED STATE
  //
  const completedState: RenderStateViewProps["state"] = {
    isLocked: true,
    message: isRejected
      ? rejectedMessage
      : isPending
      ? "Tenant has sent a booking request."
      : isAwaitingPayment || isConfirmed
      ? "Waiting for tenant payment receipt."
      : isPaymentVerified || isCompleted
      ? "Tenant Successfully Booked!"
      : "",
    lockedBgColor: getColorConfig().bgColor,
    lockedTextColor: getColorConfig().textColor,
    icon: {
      iconProducer: "Ionicons",
      iconName: isRejected
        ? "close-circle"
        : isPaymentVerified || isCompleted
        ? "checkbox"
        : "hourglass",
      color: getColorConfig().iconColor,
      size: 32,
    },
  };

  return { initialApprovalState, paymentState, completedState };
}
