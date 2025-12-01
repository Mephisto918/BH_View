import {
  Text,
  Pressable,
  Alert,
  StyleSheet,
  StyleProp,
  ViewStyle,
  ColorValue,
} from "react-native";
import React from "react";
import { Box } from "@gluestack-ui/themed";
import { AppDocumentFile } from "@/infrastructure/document/document.schema";
import { pickDocument as pickDocumentService } from "@/infrastructure/document/document.service";
import { Ionicons } from "@expo/vector-icons";
import { IoniconsIconType } from "@/constants/icons/IonIconsTypes";
import { useDocumentFullScreenModal } from "./GlobalDocumentFullScreenProvider";

interface PressableDocumentPickerProps {
  document?: AppDocumentFile;
  pickDocument: (doc: AppDocumentFile) => void;
  removeDocument?: () => void;

  pickDocumentMessage?: string;
  pickDocumentMessageColor?: ColorValue;

  containerStyle?: StyleProp<ViewStyle>;

  documentStyleConfig?: {
    containerStyle?: StyleProp<ViewStyle>;
  };

  removeDocumentIconStyleConfig?: {
    removeDocumentIconSize?: number;
    removeDocumentIconColor?: ColorValue;
    removeDocumentIconName?: IoniconsIconType;
    removeDocumentIconContainerStyle?: StyleProp<ViewStyle>;
  };

  addDocumentIconStyleConfig?: {
    addDocumentIconSize?: number;
    addDocumentIconColor?: ColorValue;
    addDocumentIconName?: IoniconsIconType;
    addDocumentIconContainerStyle?: StyleProp<ViewStyle>;
  };

  fullscreenIconStyleConfig?: {
    fullscreenIconSize?: number;
    fullscreenIconColor?: ColorValue;
    fullscreenIconName?: IoniconsIconType;
    fullscreenIconContainerStyle?: StyleProp<ViewStyle>;
  };
}

export default function PressableDocumentPicker({
  document,
  pickDocument,
  removeDocument,
  pickDocumentMessage = "Add Document",
  pickDocumentMessageColor = "#888",
  containerStyle = {},
  documentStyleConfig = {},
  removeDocumentIconStyleConfig: {
    removeDocumentIconName = "close",
    removeDocumentIconSize = 24,
    removeDocumentIconColor = "white",
    removeDocumentIconContainerStyle,
  } = {},
  addDocumentIconStyleConfig: {
    addDocumentIconName = "add",
    addDocumentIconSize = 24,
    addDocumentIconColor = "white",
    addDocumentIconContainerStyle,
  } = {},
  fullscreenIconStyleConfig: {
    fullscreenIconName = "expand",
    fullscreenIconSize = 24,
    fullscreenIconColor = "white",
    fullscreenIconContainerStyle,
  } = {},
}: PressableDocumentPickerProps) {
  const [pickedDocument, setPickedDocument] = React.useState<AppDocumentFile>();

  const isDocumentPicked = Boolean(pickedDocument);

  const { showDocumentFullscreen } = useDocumentFullScreenModal();

  console.log("Document:", document);
  React.useEffect(() => {
    if (document) setPickedDocument(document);
  }, [document]);

  const handlePickDocument = async () => {
    if (!pickedDocument) {
      try {
        const picked = await pickDocumentService();
        if (picked && picked.length > 0) {
          console.log("yawa:", picked);
          setPickedDocument(picked[0]);
          pickDocument(picked[0]);
        }
      } catch (err) {
        console.log("Pick error:", err);
        Alert.alert("Error", "Invalid document file");
      }
    }
  };

  const handleRemoveDocument = () => {
    setPickedDocument(undefined);
    removeDocument?.();
  };

  return (
    <Box style={[s.containerStyle, containerStyle]}>
      <Box style={[s.pickDocumentStyle, documentStyleConfig?.containerStyle]}>
        {pickedDocument ? (
          <Text style={{ color: "#000" }}>
            📄 {pickedDocument.name ?? "Selected Document"}
          </Text>
        ) : (
          <Text style={{ color: pickDocumentMessageColor }}>
            {pickDocumentMessage}
          </Text>
        )}
      </Box>

      {isDocumentPicked && (
        <Pressable
          onPress={() =>
            pickedDocument && showDocumentFullscreen(pickedDocument.uri!)
          }
          style={[s.fullscreenButton, fullscreenIconContainerStyle]}
        >
          <Ionicons
            name={fullscreenIconName}
            color={fullscreenIconColor}
            size={fullscreenIconSize}
          />
        </Pressable>
      )}

      {!isDocumentPicked && (
        <Pressable
          onPress={handlePickDocument}
          style={[s.addDocumentStyle, addDocumentIconContainerStyle]}
        >
          <Ionicons
            name={addDocumentIconName}
            color={addDocumentIconColor}
            size={addDocumentIconSize}
          />
        </Pressable>
      )}

      {isDocumentPicked && (
        <Pressable
          onPress={handleRemoveDocument}
          style={[s.removeDocumentStyle, removeDocumentIconContainerStyle]}
        >
          <Ionicons
            name={removeDocumentIconName}
            color={removeDocumentIconColor}
            size={removeDocumentIconSize}
          />
        </Pressable>
      )}
    </Box>
  );
}

const s = StyleSheet.create({
  containerStyle: {},
  removeDocumentStyle: {
    position: "absolute",
    top: 10,
    left: 10,
    backgroundColor: "rgba(0,0,0,0.4)",
    borderRadius: 20,
    padding: 6,
  },
  addDocumentStyle: {
    position: "absolute",
    top: 10,
    left: 10,
    backgroundColor: "rgba(0,0,0,0.4)",
    borderRadius: 20,
    padding: 6,
  },
  pickDocumentStyle: {
    width: "100%",
    height: 100,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
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
