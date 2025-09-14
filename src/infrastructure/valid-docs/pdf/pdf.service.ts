import DocumentPicker from "react-native-document-picker";
import { AppPDFFile } from "./pdf.types";
import { PDFSchema } from "./pdf.schema";

export async function pickPDF(): Promise<AppPDFFile | null> {
  try {
    const result = await DocumentPicker.pickSingle({
      type: [DocumentPicker.types.pdf],
      copyTo: "cachesDirectory",
      allowMultiSelection: false,
    });

    if (
      !result ||
      !result.name ||
      !result.size ||
      !result.type ||
      !result.uri ||
      !result.fileCopyUri
    ) {
      throw new Error("Invalid PDF metadata");
    }

    const pdf: AppPDFFile = {
      uri: result.fileCopyUri || result.uri,
      name: result.name,
      type: result.type,
      size: result.size,
    };

    const parsedPDF = PDFSchema.safeParse(pdf);
    if (!parsedPDF.success) throw new Error("Invalid PDF File");

    return pdf;
  } catch (error: unknown) {
    if (DocumentPicker.isCancel(error)) return null;
    throw error;
  }
}

//* Usage
/*
 * const handlePick = async () => {
 *   const pdf = await pickPDF();
 *   if (!pdf) return;
 *
 *   // Now you’re safe: all fields present, validated
 *   uploadPermitPDF(pdf, PermitEnum.DTI);
 * };
 */
