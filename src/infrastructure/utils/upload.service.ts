import RNFetchBlob from "react-native-blob-util";
import api from "@/application/config/api";
import { CreateBoardingHouseInput } from "../boarding-houses/boarding-house.schema";

type UploadResponse =
  | { success: true; data: any }
  | { success: false; error: string };

export const uploadBoardingHouse = async (
  data: CreateBoardingHouseInput
): Promise<UploadResponse> => {
  const API_URL = api.BASE_URL;

  try {
    const formData: any[] = [
      { name: "ownerId", data: String(data.ownerId) },
      { name: "name", data: data.name },
      { name: "address", data: data.address },
      { name: "description", data: data.description || "" },
      {
        name: "availabilityStatus",
        data: data.availabilityStatus ? "true" : "false",
      },
      { name: "amenities", data: JSON.stringify(data.amenities ?? []) },
      { name: "location", data: JSON.stringify(data.location ?? {}) },
      { name: "rooms", data: JSON.stringify(data.rooms ?? []) },
    ];

    if (data.thumbnail?.[0]) {
      const file = data.thumbnail[0];
      formData.push({
        name: "thumbnail",
        filename: file.name ?? "thumbnail.jpg",
        type: file.type ?? "image/jpeg",
        data: RNFetchBlob.wrap(file.uri.replace("file://", "")),
      });
    }

    data.gallery?.forEach((file, i) => {
      formData.push({
        name: "gallery",
        filename: file.name ?? `gallery-${i}.jpg`,
        type: file.type ?? "image/jpeg",
        data: RNFetchBlob.wrap(file.uri.replace("file://", "")),
      });
    });

    const response = await RNFetchBlob.fetch(
      "POST",
      `${API_URL}/api/boarding-houses`,
      { "Content-Type": "multipart/form-data" },
      formData
    );

    const json = response.json();
    if (json.success) {
      return { success: true, data: json.results };
    } else {
      return { success: false, error: json.results };
    }
  } catch (err: any) {
    console.error("Upload failed:", err);
    return { success: false, error: err.message ?? "Network error" };
  }
};
