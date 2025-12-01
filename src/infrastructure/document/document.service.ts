import DocumentPicker, {
  DocumentPickerResponse,
} from "react-native-document-picker";
import * as FileSystem from "expo-file-system";

import { AppDocumentFile, DocumentUploadSchema } from "./document.schema";

export const PERSISTENT_DOC_DIR = `${FileSystem.documentDirectory}picked_documents/`;

/** ------------------------------
 * Convert URI → Blob-Safe URI
 * Makes sure RNFetchBlob / FormData can read the file
 * ------------------------------ */
async function makeBlobReadable(uri: string): Promise<string> {
  const info = await FileSystem.getInfoAsync(uri);

  if (info.exists) {
    // normalize double-prefix
    return info.uri.replace("file://", "");
  }

  // fallback: copy to cache
  const dest = `${FileSystem.cacheDirectory}${Date.now()}`;
  await FileSystem.copyAsync({ from: uri, to: dest });

  return dest.replace("file://", "");
}

/**
 * Ensures the directory exists
 */
async function ensureDirectory() {
  const dir = await FileSystem.getInfoAsync(PERSISTENT_DOC_DIR);
  if (!dir.exists) {
    await FileSystem.makeDirectoryAsync(PERSISTENT_DOC_DIR, {
      intermediates: true,
    });
  }
}

/**
 * Copy file into a persistent app directory
 */
async function copyToPersistent(
  uri: string,
  filename: string
): Promise<string> {
  await ensureDirectory();
  const dest = `${PERSISTENT_DOC_DIR}${filename}`;
  await FileSystem.copyAsync({ from: uri, to: dest });
  return dest;
}

/**
 * Normalizes picker file into AppDocumentFile
 */
async function normalizePickedFile(
  file: DocumentPickerResponse
): Promise<AppDocumentFile> {
  if (!file.uri || !file.name || !file.type)
    throw new Error("Invalid selected document");

  const safeName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, "_");

  // copy to persistent storage for safe access
  const persistentUri = await copyToPersistent(file.uri, safeName);

  const doc: AppDocumentFile = {
    uri: persistentUri,
    name: file.name,
    type: file.type.toLowerCase(),
    size: file.size ?? 0,
    mediaType: "pdf", // override in UI if needed
  };

  const parsed = DocumentUploadSchema.safeParse(doc);
  if (!parsed.success) {
    console.error(parsed.error.format());
    throw new Error("Invalid document format");
  }

  return parsed.data;
}

/**
 * Picks 1–N documents
 */
export async function pickDocument(
  limit: number = 1
): Promise<AppDocumentFile[] | null> {
  try {
    const result = await DocumentPicker.pick({
      type: [
        DocumentPicker.types.pdf,
        DocumentPicker.types.doc,
        DocumentPicker.types.docx,
      ],
      allowMultiSelection: limit > 1,
      copyTo: "cachesDirectory",
    });

    // Ensure array consistency
    const files = Array.isArray(result) ? result : [result];

    // Limit the output
    const limitedFiles = files.slice(0, limit);

    const normalized: AppDocumentFile[] = [];

    for (const file of limitedFiles) {
      const clean = await normalizePickedFile(file);
      normalized.push(clean);
    }

    return normalized;
  } catch (error: unknown) {
    if (DocumentPicker.isCancel(error)) return null;
    console.error("Error picking document:", error);
    throw error;
  }
}
/**

 * Convenience wrapper for picking ONE document
 */
export async function pickSingleDocument(): Promise<AppDocumentFile | null> {
  const results = await pickDocument(1);
  return results ? results[0] : null;
}

export async function documentToFormData(
  doc: AppDocumentFile,
  dto: any // CreateVerificationDocumentDto
): Promise<FormData> {
  const fd = new FormData();

  // append DTO fields
  for (const [key, value] of Object.entries(dto)) {
    fd.append(key, String(value));
  }

  // make safe uri
  const blobUri = await makeBlobReadable(doc.uri);

  fd.append("file", {
    uri: `file://${blobUri}`,
    name: doc.name,
    type: doc.type === "pdf" ? "application/pdf" : "application/octet-stream",
  } as any);

  return fd;
}
