// import { useDecisionModal } from "@/components/ui/FullScreenDecisionModal";

// const { showModal } = useDecisionModal();

// export default function useDecisionModalConfigs() {
//   const handleRejectApproveAction = (answer: boolean) => {
//     if (answer) {
//       showModal({
//         title: "Confirm Booking Approval",
//         cancelText: "Cancel",
//         confirmText: "Approve Booking",
//         message:
//           "Are you sure you want to approve this booking request? Once approved, the tenant will be notified and the booking will be confirmed.",
//         onConfirm: async () => {
//           try {
//             const res = await approveAction({
//               id: bookingId,
//               payload: { ownerId, message: rejectApproveMessage },
//             }).unwrap();

//             refetchBookingData();
//             console.log("Approve response:", res);
//             Alert.alert("Booking approved successfully!");
//           } catch (e) {
//             console.log(e);
//             Alert.alert("Something went wrong while approving booking.");
//           }
//         },
//       });
//     } else {
//       showModal({
//         title: "Reject Booking Request",
//         cancelText: "Cancel",
//         confirmText: "Reject Booking",
//         message:
//           "Do you really want to reject this booking? This action cannot be undone, and the tenant will be notified of the rejection.",
//         onConfirm: async () => {
//           try {
//             const res = await rejectAction({
//               id: bookingId,
//               payload: { ownerId, reason: rejectApproveMessage },
//             }).unwrap();
//             refetchBookingData();
//             console.log("Reject response:", res);
//             Alert.alert("Booking rejected successfully!");
//           } catch (e) {
//             console.log(e);
//             Alert.alert("Something went wrong while approving booking.");
//           }
//         },
//       });
//     }
//   };

//   const handlePaymentAction = (answer: boolean) => {
//     if (answer) {
//       showModal({
//         title: "Confirm Booking Payment",
//         cancelText: "Cancel",
//         confirmText: "Approve Booking",
//         message:
//           "Are you sure you want to approve this booking request? Once approved, the tenant will be notified and the booking will be confirmed.",
//         onConfirm: async () => {
//           try {
//             const res = await approveAction({
//               id: bookingId,
//               payload: { ownerId, message: rejectApproveMessage },
//             }).unwrap();

//             refetchBookingData();
//             console.log("Approve response:", res);
//             Alert.alert("Booking approved successfully!");
//           } catch (e) {
//             console.log(e);
//             Alert.alert("Something went wrong while approving booking.");
//           }
//         },
//       });
//     } else {
//       showModal({
//         title: "Reject Booking Request",
//         cancelText: "Cancel",
//         confirmText: "Reject Booking",
//         message:
//           "Do you really want to reject this booking? This action cannot be undone, and the tenant will be notified of the rejection.",
//         onConfirm: async () => {
//           try {
//             const res = await rejectAction({
//               id: bookingId,
//               payload: { ownerId, reason: rejectApproveMessage },
//             }).unwrap();
//             refetchBookingData();
//             console.log("Reject response:", res);
//             Alert.alert("Booking rejected successfully!");
//           } catch (e) {
//             console.log(e);
//             Alert.alert("Something went wrong while approving booking.");
//           }
//         },
//       });
//     }
//   };
// }
