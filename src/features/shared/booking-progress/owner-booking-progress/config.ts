import { GetBooking } from "@/infrastructure/booking/booking.schema";
import { RenderStateViewProps } from "../RenderStateView";

export default function useOwnerBookingProgress(
  bookingData: GetBooking | null | undefined
) {
  if (!bookingData) return null;

  // PENDING_REQUEST
  // AWAITING_PAYMENT
  // PAYMENT_APPROVAL
  // COMPLETED_BOOKING
  // CANCELLED_BOOKING
  // REJECTED_BOOKING
  // const status = "PENDING_REQUEST";

  const status = bookingData.status;
  console.log("configState:", status);

  // Status flags
  const isPending = status === "PENDING_REQUEST";
  const isAwaitingPayment = status === "AWAITING_PAYMENT";
  const isPaymentApproval = status === "PAYMENT_APPROVAL";
  const isCompleted = status === "COMPLETED_BOOKING";
  const isRejected = status === "REJECTED_BOOKING";
  const isCancelled = status === "CANCELLED_BOOKING";

  console.log("Owner booking progress state:", status);

  // Color presets
  const colorPresets = {
    rejected: {
      textColor: "#f5f3f4",
      bgColor: "#e5383b",
      iconColor: "#ba181b",
    },
    pending: { textColor: "#ddb892", bgColor: "#b08968", iconColor: "#7f5539" },
    processing: {
      textColor: "#fafdf6",
      bgColor: "#a4ac86", // muted olive green
      iconColor: "#656d4a",
    },
    completed: {
      textColor: "#f2e8cf",
      bgColor: "#6a994e",
      iconColor: "#386641",
    },
  };

  const initialColorConfigPreset = getInitialColorConfig(status, colorPresets);
  const paymentColorConfigPreset = getPaymentColorConfig(status, colorPresets);
  const completedColorConfigPreset = getCompletedColorConfig(
    status,
    colorPresets
  );

  const rejectedMessage =
    bookingData?.ownerMessage || "This booking request was rejected.";
  const canceledMessage =
    bookingData?.ownerMessage || "This booking was canceled.";

  //
  // 1️⃣ INITIAL APPROVAL STATE
  //
  const initialApprovalState: RenderStateViewProps["state"] = {
    isLocked: !isPending,
    message: isRejected
      ? rejectedMessage
      : isCancelled
      ? canceledMessage
      : isPending
      ? ""
      : isAwaitingPayment
      ? "Accepted booking request."
      : isPaymentApproval
      ? "Accepted booking request."
      : isCompleted
      ? "This booking has been completed."
      : "",
    lockedBgColor: initialColorConfigPreset.bgColor,
    lockedTextColor: initialColorConfigPreset.textColor,
    icon: {
      iconProducer: "Ionicons",
      iconName:
        isRejected || isCancelled
          ? "close-circle"
          : isPending
          ? "hourglass"
          : isAwaitingPayment
          ? "checkbox"
          : isPaymentApproval
          ? "checkbox"
          : isCompleted
          ? "checkbox"
          : "close-circle",
      color: initialColorConfigPreset.iconColor,
      size: 32,
    },
  };

  //
  // 2️⃣ PAYMENT STATE
  //
  const paymentState: RenderStateViewProps["state"] = {
    isLocked: !isPaymentApproval,
    message: isRejected
      ? rejectedMessage
      : isCancelled
      ? canceledMessage
      : isPending
      ? "..."
      : isAwaitingPayment
      ? "Waiting for payment"
      : isCompleted
      ? "This booking has been completed."
      : "",
    lockedBgColor: paymentColorConfigPreset.bgColor,
    lockedTextColor: paymentColorConfigPreset.textColor,
    icon: {
      iconProducer: "Ionicons",
      iconName:
        isRejected || isCancelled
          ? "close-circle"
          : isPending
          ? "hourglass"
          : isAwaitingPayment
          ? "hourglass"
          : isPaymentApproval
          ? "hourglass"
          : isCompleted
          ? "checkbox"
          : "close-circle",
      color: paymentColorConfigPreset.iconColor,
      size: 32,
    },
  };

  //
  // 3️⃣ COMPLETED STATE
  //
  const completedState: RenderStateViewProps["state"] = {
    isLocked: true,
    message: isRejected
      ? rejectedMessage
      : isCancelled
      ? canceledMessage
      : isPending
      ? "..."
      : isAwaitingPayment
      ? "Waiting for payment"
      : isCompleted
      ? "This booking has been completed."
      : "",
    lockedBgColor: completedColorConfigPreset.bgColor,
    lockedTextColor: completedColorConfigPreset.textColor,
    icon: {
      iconProducer: "Ionicons",
      iconName:
        isRejected || isCancelled
          ? "close-circle"
          : isPending
          ? "hourglass"
          : isAwaitingPayment
          ? "hourglass"
          : isPaymentApproval
          ? "hourglass"
          : isCompleted
          ? "checkbox"
          : "close-circle",
      color: completedColorConfigPreset.iconColor,
      size: 32,
    },
  };

  return { initialApprovalState, paymentState, completedState };
}

function getInitialColorConfig(status: string, colors: typeof colorPresets) {
  if (["REJECTED_BOOKING", "CANCELLED_BOOKING"].includes(status))
    return colors.rejected;

  if (status === "PENDING_REQUEST") return colors.pending;

  if (["CONFIRMED_REQUEST", "AWAITING_PAYMENT"].includes(status))
    return colors.processing;

  if (
    ["PAYMENT_VERIFIED", "COMPLETED_BOOKING", "PAYMENT_APPROVAL"].includes(
      status
    )
  )
    return colors.completed;

  // default fallback
  return colors.processing;
}
function getPaymentColorConfig(status: string, colors: typeof colorPresets) {
  if (["REJECTED_BOOKING", "CANCELLED_BOOKING"].includes(status))
    return colors.rejected;

  if (status === "PENDING_REQUEST") return colors.pending;

  if (
    ["CONFIRMED_REQUEST", "AWAITING_PAYMENT", "PAYMENT_APPROVAL"].includes(
      status
    )
  )
    return colors.pending;

  if (["PAYMENT_VERIFIED", "COMPLETED_BOOKING"].includes(status))
    return colors.completed;

  // default fallback
  return colors.rejected;
}
function getCompletedColorConfig(status: string, colors: typeof colorPresets) {
  if (["REJECTED_BOOKING", "CANCELLED_BOOKING"].includes(status))
    return colors.rejected;

  if (status === "PENDING_REQUEST") return colors.pending;

  if (
    ["CONFIRMED_REQUEST", "AWAITING_PAYMENT", "PAYMENT_APPROVAL"].includes(
      status
    )
  )
    return colors.pending;

  if (["PAYMENT_VERIFIED", "COMPLETED_BOOKING"].includes(status))
    return colors.completed;

  // default fallback
  return colors.processing;
}
