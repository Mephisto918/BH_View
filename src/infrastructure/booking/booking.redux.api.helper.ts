import RNFetchBlob from "react-native-blob-util";
import { CreatePaymentProofInput } from "./booking.schema";
import api from "@/application/config/api";
import { expoStorageCleaner } from "../image/image.service";

export const uploadPaymentProof = async (
  id: number,
  payload: CreatePaymentProofInput
) => {
  const API_URL = api.BASE_URL;

  const formData: any[] = [
    { name: "tenantId", data: String(payload.tenantId) },
  ];

  if (payload.note) {
    formData.push({ name: "note", data: payload.note });
  }

  if (payload.paymentImage?.uri) {
    // Remove any "file://" prefix for RNFetchBlob
    const filePath = payload.paymentImage.uri.replace(/^file:\/\//, "");

    formData.push({
      name: "image", // must match backend field name
      filename: payload.paymentImage.name,
      type: payload.paymentImage.type,
      data: RNFetchBlob.wrap(filePath), // clean file path
    });
  }

  console.log("Uploading formData:", formData);

  const res = await RNFetchBlob.fetch(
    "POST",
    `${API_URL}/api/bookings/${id}/payment-proof`,
    {
      "Content-Type": "multipart/form-data",
    },
    formData
  );

  await expoStorageCleaner();

  return res.json();
};
