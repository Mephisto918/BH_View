import React from "react";
import { Modal, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Box } from "@gluestack-ui/themed";
import WebView from "react-native-webview";
import Pdf from "react-native-pdf";

interface Props {
  visible: boolean;
  documentUri: string | null;
  onClose: () => void;
}

export default function DocumentFullScreenModal({
  visible,
  documentUri,
  onClose,
}: Props) {
  if (!visible || !documentUri) return null;

  const uri =
    documentUri.startsWith("http") || documentUri.startsWith("file://")
      ? documentUri
      : `file://${documentUri}`;

  console.log("docs url: ", uri);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <Box style={styles.overlay}>
        <Pdf
          source={{ uri }}
          style={{ flex: 1 }}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={true}
        />

        <Pressable style={styles.closeButton} onPress={onClose}>
          <Ionicons name="close" size={28} color="white" />
        </Pressable>
      </Box>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.95)",
  },
  closeButton: {
    position: "absolute",
    top: 40,
    right: 20,
    padding: 10,
    backgroundColor: "rgba(0,0,0,0.7)",
    borderRadius: 50,
  },
});
