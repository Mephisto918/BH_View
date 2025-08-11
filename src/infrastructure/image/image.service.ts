import {
  launchImageLibrary,
  ImageLibraryOptions,
} from "react-native-image-picker";

import * as ImagePicker from "expo-image-picker";
import { Platform } from "react-native";
import { AppImageFile, ImageSchema } from "./image.schema";

export async function pickImage(
  limit: number = 1
): Promise<AppImageFile[] | null> {
  const defaultOptions: ImageLibraryOptions = {
    mediaType: "photo",
    selectionLimit: limit,
  };

  return new Promise((resolve, reject) => {
    launchImageLibrary(defaultOptions, (response) => {
      if (response.didCancel) {
        return resolve(null);
      }

      const rawAssets = response.assets ?? [];

      // Quick fail if no assets at all
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
          type: asset.type,
          name: asset.fileName,
          size: asset.fileSize,
          quality: "medium",
        };

        const parse = ImageSchema.safeParse(image);
        if (!parse.success) {
          return reject(new Error("Invalid image file"));
        }

        images.push(image);
      }

      // Return if limit is exceeded
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
  // Request permission to access media library
  const permissionResult =
    await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (!permissionResult.granted) {
    throw new Error("Permission to access media library was denied");
  }

  // Launch image picker
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: "images", // Use string "image" instead of MediaTypeOptions.Images
    allowsMultipleSelection: limit > 1,
    selectionLimit: limit,
    quality: 1,
  });

  if (result.canceled) {
    return null;
  }

  const images: AppImageFile[] = result.assets.map((asset) => {
    const image: AppImageFile = {
      uri: asset.uri,
      type: asset.mimeType || "image/jpeg", // Fallback to jpeg if mimeType is undefined
      name: asset.fileName || `image-${Date.now()}.jpg`, // Generate a name if not provided
      quality: imgQuality,
      size: asset.fileSize || 0, // expo-image-picker may not always provide fileSize
    };

    const parse = ImageSchema.safeParse(image);
    if (!parse.success) {
      console.log("Zod parsing error:", parse.error.format());
      throw new Error("Invalid image file");
    }

    return image;
  });

  if (images.length > limit) {
    throw new Error(`Uploaded images exceed the limit of ${limit}`);
  }

  return images;
}

//* Usage
/*
 * import { pickImage, AppImageFile } from "@/infrastructure/image/image.service";
 *
 * const [image, setImage] = useState<AppImageFile | null>(null);
 *
 * const handlePickImage = async () => {
 *   try {
 *     const singleImage = await pickImage(1);
 *
 *     setImage(singleImage?.[0] || null);
 *     if (img) setImage(img);
 *
 *     //** if multiple images
 *     // const imageList = await pickImage(3);
 *     // setImages(imageList || []);
 *   } catch (err) {
 *     Alert.alert("Image Error", err.message);
 *   }
 * };
 *
 * // send it via FormData
 * const formData = new FormData();
 * formData.append("image", {
 *   uri: image.uri,
 *   name: image.name,
 *   type: image.type,
 * });
 *
 *
 * // in jsx, show the preview selected image
 * {image && <Image source={{ uri: image.uri }} style={{ width: 100, height: 100 }} />}
 */
