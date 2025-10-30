import {
  launchImageLibrary,
  ImageLibraryOptions,
} from "react-native-image-picker";

import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { Platform } from "react-native";
import { AppImageFile, ImageUploadSchema } from "./image.schema";

// ✅ helper: make sure file exists and is readable for RNFetchBlob
async function makeBlobReadable(image: AppImageFile) {
  try {
    const info = await FileSystem.getInfoAsync(image.uri);
    if (info.exists) {
      // Expo sometimes prefixes file:// twice — normalize
      return info.uri.replace("file://", "");
    }

    // Copy to cache dir if not directly readable
    const newPath = `${FileSystem.cacheDirectory}${image.name}`;
    await FileSystem.copyAsync({ from: image.uri, to: newPath });
    return newPath.replace("file://", "");
  } catch (err) {
    console.warn("makeBlobReadable error:", err);
    return image.uri.replace("file://", "");
  }
}

export async function pickImage(
  limit: number = 1
): Promise<AppImageFile[] | null> {
  const defaultOptions: ImageLibraryOptions = {
    mediaType: "photo",
    selectionLimit: limit,
  };

  return new Promise((resolve, reject) => {
    launchImageLibrary(defaultOptions, async (response) => {
      if (response.didCancel) {
        return resolve(null);
      }

      const rawAssets = response.assets ?? [];

      if (rawAssets.length === 0) {
        return reject(new Error("No image selected"));
      }

      const images: AppImageFile[] = [];

      for (const asset of rawAssets) {
        if (!asset.uri || !asset.type || !asset.fileName) {
          return reject(new Error("Invalid image metadata"));
        }

        const image: AppImageFile = {
          uri: asset.uri,
          url: asset.uri,
          type: asset.type,
          name: asset.fileName,
          size: asset.fileSize,
          quality: "medium",
        };

        const parse = ImageUploadSchema.safeParse(image);
        if (!parse.success) {
          return reject(new Error("Invalid image file"));
        }

        // ✅ ensure readable URI for RNFetchBlob
        const safeUri = await makeBlobReadable(image);
        images.push({ ...image, uri: safeUri });
      }

      if (images.length > limit) {
        return reject(
          new Error(`Uploaded images exceed the limit of ${limit}`)
        );
      }

      resolve(images);
    });
  });
}

export async function requestImagePermission() {
  if (Platform.OS !== "web") {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    return permissionResult.granted;
  }
  return true;
}

export async function pickImageExpo(
  limit: number = 1,
  imgQuality: string = "medium"
): Promise<AppImageFile[] | null> {
  const permissionResult =
    await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (!permissionResult.granted) {
    throw new Error("Permission to access media library was denied");
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: "images",
    allowsMultipleSelection: limit > 1,
    selectionLimit: limit,
    quality: 1,
  });

  if (result.canceled) {
    return null;
  }

  const images: AppImageFile[] = [];

  for (const asset of result.assets) {
    const image: AppImageFile = {
      uri: asset.uri,
      url: asset.uri,
      type: asset.mimeType || "image/jpeg",
      name: asset.fileName || `image-${Date.now()}.jpg`,
      quality: imgQuality,
      size: asset.fileSize || 0,
    };

    const parse = ImageUploadSchema.safeParse(image);
    if (!parse.success) {
      console.log("Zod parsing error:", parse.error.format());
      throw new Error("Invalid image file");
    }

    // ✅ ensure file is readable by RNFetchBlob
    const safeUri = await makeBlobReadable(image);
    images.push({ ...image, uri: safeUri });
  }

  if (images.length > limit) {
    throw new Error(`Uploaded images exceed the limit of ${limit}`);
  }

  return images;
}
