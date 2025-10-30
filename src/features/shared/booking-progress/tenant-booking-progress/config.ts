import { GetBooking } from "@/infrastructure/booking/booking.schema";
import { RenderStateViewProps } from "../RenderStateView";

export default function useTenantBookingProgress(
  bookingData: GetBooking | null | undefined
) {
  if (!bookingData)
    return {
      initialApprovalState: undefined,
      paymentState: undefined,
      completedState: undefined,
    };

  const initialApprovalState: RenderStateViewProps["state"] = {
    isLocked: true,
    message:
      bookingData?.status === "PENDING"
        ? "Your Request is still Pending."
        : bookingData?.status === "AWAITING_PAYMENT"
        ? "Your Request has been Accepted."
        : bookingData?.status === "COMPLETED"
        ? "Your Request has been Accepted."
        : `Your Request has been Rejected. ${
            bookingData?.ownerMessage ? bookingData.ownerMessage : ""
          }`,
    lockedBgColor:
      bookingData?.status === "PENDING"
        ? "brown"
        : bookingData?.status === "AWAITING_PAYMENT"
        ? "green"
        : bookingData?.status === "COMPLETED"
        ? "green"
        : "red",
    lockedTextColor:
      bookingData?.status === "PENDING"
        ? "brown"
        : bookingData?.status === "AWAITING_PAYMENT"
        ? "green"
        : bookingData?.status === "COMPLETED"
        ? "green"
        : "red",
    icon: {
      iconProducer: "Ionicons",
      iconName:
        bookingData?.status === "PENDING"
          ? "hourglass"
          : bookingData?.status === "AWAITING_PAYMENT"
          ? "checkbox"
          : bookingData?.status === "COMPLETED"
          ? "checkbox"
          : "square",
      color:
        bookingData?.status === "PENDING"
          ? "brown"
          : bookingData?.status === "AWAITING_PAYMENT"
          ? "green"
          : bookingData?.status === "COMPLETED"
          ? "green"
          : "red",
      size: 32,
    },
  };

  const paymentState: RenderStateViewProps["state"] = {
    isLocked: bookingData?.status !== "AWAITING_PAYMENT",
    message:
      bookingData?.status === "AWAITING_PAYMENT"
        ? "Upload your Payment Receipt"
        : bookingData?.status === "PAYMENT_VERIFIED"
        ? "Your Request has been Accepted."
        : `Your Request has been Rejected. ${
            bookingData?.ownerMessage ? bookingData.ownerMessage : ""
          }`,
    lockedBgColor:
      bookingData?.status === "AWAITING_PAYMENT"
        ? "brown"
        : bookingData?.status === "PAYMENT_VERIFIED"
        ? "green"
        : "red",
    lockedTextColor:
      bookingData?.status === "AWAITING_PAYMENT"
        ? "brown"
        : bookingData?.status === "PAYMENT_VERIFIED"
        ? "green"
        : "red",
    icon: {
      iconProducer: "Ionicons",
      iconName:
        bookingData?.status === "AWAITING_PAYMENT"
          ? "hourglass"
          : bookingData?.status === "PAYMENT_VERIFIED"
          ? "checkbox"
          : "square",
      color:
        bookingData?.status === "AWAITING_PAYMENT"
          ? "brown"
          : bookingData?.status === "PAYMENT_VERIFIED"
          ? "green"
          : "red",
      size: 32,
    },
  };

  const completedState: RenderStateViewProps["state"] = {
    isLocked: true,
    message:
      bookingData?.status === "COMPLETED"
        ? `Your booking #${bookingData.id} is completed. ${
            bookingData.ownerMessage || ""
          }`
        : "",
    lockedBgColor:
      bookingData?.status === "COMPLETED"
        ? "green"
        : bookingData?.status !== "REJECTED"
        ? "red"
        : "brown",
    lockedTextColor:
      bookingData?.status === "COMPLETED"
        ? "green"
        : bookingData?.status === "REJECTED"
        ? "red"
        : "brown",
    icon: {
      iconProducer: "Ionicons",
      iconName:
        bookingData?.status === "COMPLETED"
          ? "checkbox"
          : bookingData?.status === "REJECTED"
          ? "square"
          : "square",
      color:
        bookingData?.status === "COMPLETED"
          ? "green"
          : bookingData?.status === "REJECTED"
          ? "red"
          : "brown",
      size: 32,
    },
  };

  return { initialApprovalState, paymentState, completedState };
}
