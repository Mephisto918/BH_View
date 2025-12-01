import {
  Text,
  Pressable,
  Image,
  StyleSheet,
  ImageStyle,
  StyleProp,
  ViewStyle,
  ColorValue,
  ImageResizeMode,
} from "react-native";
import React from "react";
import { Box } from "@gluestack-ui/themed";
import { Ionicons } from "@expo/vector-icons";
import PDF from "react-native-pdf";

import { IoniconsIconType } from "@/constants/icons/IonIconsTypes";
import { useDocumentFullScreenModal } from "./GlobalDocumentFullScreenProvider";
import { Spacing } from "@/constants";

interface PressableDocumentFullscreenProps {
  removeFullScreenButton?: boolean;
  document?: string | null; // backend URL
  noDocumentMessageColor?: ColorValue;
  noDocumentMessage?: string;
  containerStyle?: StyleProp<ViewStyle>;
  errorDocumentMessageColor?: ColorValue;
  documentStyleConfig?: {
    documentStyleProps?: StyleProp<ImageStyle>;
    containerStyle?: StyleProp<ViewStyle>;
    resizeMode?: ImageResizeMode;
  };
  fullscreenIconStyleConfig?: {
    fullscreenIconSize?: number;
    fullscreenIconColor?: ColorValue;
    fullscreenIconName?: IoniconsIconType;
    fullscreenIconContainerStyle?: StyleProp<ViewStyle>;
  };
  alt?: string;
}

export default function PressableDocumentFullscreen({
  removeFullScreenButton = false,
  document,
  noDocumentMessageColor = "#888",
  noDocumentMessage = "No document",
  containerStyle = {},
  errorDocumentMessageColor = "#888",
  documentStyleConfig = {},
  fullscreenIconStyleConfig: {
    fullscreenIconName = "expand",
    fullscreenIconSize = 24,
    fullscreenIconColor = "white",
    fullscreenIconContainerStyle,
  } = {},
  alt,
}: PressableDocumentFullscreenProps) {
  const { showDocumentFullscreen } = useDocumentFullScreenModal();

  console.log("Document:", document);

  // Fix double slashes ("//")
  const sanitizedUri = document?.replace(/([^:]\/)\/+/g, "$1") ?? null;

  // Detect PDF
  const isPDF = sanitizedUri?.toLowerCase().trim().endsWith(".pdf");

  return (
    <Box style={[styles.containerStyle, containerStyle]}>
      <Box style={[styles.previewStyle, documentStyleConfig?.containerStyle]}>
        {/* No document */}
        {!sanitizedUri && (
          <Text style={{ color: noDocumentMessageColor }}>
            {noDocumentMessage}
          </Text>
        )}

        {/* PDF Preview */}
        {sanitizedUri && isPDF && (
          <Ionicons name="document-text-outline" size={24} color="#666" />
        )}
        {/* {sanitizedUri && isPDF && (
          <PDF
            source={{ uri: sanitizedUri, cache: false }}
            style={styles.pdfPreview}
            minScale={1}
            maxScale={3}
            onError={(e) => console.log("PDF Load Error:", e)}
            onLoadProgress={(p) => console.log("PDF progress:", p)}
          />
        )} */}

        {/* Image Preview */}
        {sanitizedUri && !isPDF && (
          <Image
            source={{ uri: sanitizedUri }}
            style={[
              styles.imagePreview,
              documentStyleConfig?.documentStyleProps,
            ]}
            resizeMode={documentStyleConfig?.resizeMode ?? "contain"}
            alt={alt ?? "Document"}
          />
        )}
      </Box>

      {/* Fullscreen button */}
      {sanitizedUri && !removeFullScreenButton && (
        <Pressable
          onPress={() => showDocumentFullscreen(sanitizedUri)}
          style={[styles.fullscreenButton, fullscreenIconContainerStyle]}
        >
          <Ionicons
            name={fullscreenIconName}
            color={fullscreenIconColor}
            size={fullscreenIconSize}
          />
        </Pressable>
      )}
    </Box>
  );
}

const styles = StyleSheet.create({
  containerStyle: {},
  previewStyle: {
    width: "100%",
    height: "auto",
    padding: Spacing.xl,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  pdfPreview: {
    width: "100%",
    height: "100%",
  },
  imagePreview: {
    width: "100%",
    height: "100%",
  },
  fullscreenButton: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "rgba(0,0,0,0.4)",
    borderRadius: 20,
    padding: 6,
  },
});
